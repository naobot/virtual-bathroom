import React, { Component } from 'react';
import Pusher from 'pusher-js';
import Hallway from './Hallway'
import WaitingRoom from './WaitingRoom';
import Stall from './Stall';
import './css/normalize.css';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.pusher = new Pusher('93d5b6db6095187f5ef6', {
      cluster: 'us2',
      encrypted: true,
      authEndpoint: `${process.env.REACT_APP_API_URL}/pusher/auth`,
    });
    this.spy = new Pusher('93d5b6db6095187f5ef6', {
      encrypted: true,
      authEndpoint: `${process.env.REACT_APP_API_URL}/pusher/auth`,
      cluster: 'us2',
      auth: {
        params: {
          isSpy: true
        }
      }
    });
    this.me = null;
    this.state = {
      currentView: { type: 'hallway', id: null },
      stalls: [], // object of Stall components
      pusher_app_members: { count: 0 }, // pusher members object
      inLine: 0,
      message: '',
    };
    this.max_occupancy = 2; // ADJUST AS NEEDED
    this.num_stalls = 2; // ADJUST AS NEEDED
    this.countMembers = this.countMembers.bind(this);
    this.spyOn = this.spyOn.bind(this);
    this.handleEnterBathroom = this.handleEnterBathroom.bind(this);
    this.handleEnterStall = this.handleEnterStall.bind(this);
    this.updateMemberCount = this.updateMemberCount.bind(this);
  }


  componentDidMount() {
    this.spyOn('presence-bathroom', 'waiting');
    for (var i = 0; i < this.num_stalls; i++) {
      this.spyOn(`presence-stall-${i}`, 'stall');
    }
    // main app channel
    this.presenceChannel = this.pusher.subscribe('presence-app');
    console.log('trying to subscribe');
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.me = this.presenceChannel.members.me.id;
      this.updateAppMembers(this.presenceChannel.members);
      console.log(this.presenceChannel.members.me.id + ' subscribed to WaitingRoom');
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateAppMembers(this.presenceChannel.members);
      console.log(`currentViewType: ${this.state.currentViewType}`);
      console.log('someone joined Bathroom App');
    });
    // someone left App
    this.presenceChannel.bind('pusher:member_removed', (member) => {
      this.updateAppMembers(this.presenceChannel.members);
      console.log(`${member.id} left Bathroom App`);
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('presence-app');
  }

  // returns a the number of members connected to channel
  // excluding spies
  countMembers(channel) {
    console.log("Current users in " + channel.name + ":");
    var count = 0;
    var stallId = channel.name.split('-').pop();
    channel.members.each(function (member) {
      if (!member.info.isSpy) { console.log("user: " + member.id); count++; }
    });
    return count
  };

  // generic 'true' member count (excludes spies)
  updateMemberCount(num, location, stallId) {
    if (location === 'stall') {
      var stallsCopy = Array.from(this.state.stalls);
      stallsCopy[stallId] = { id: stallId, occupants: num };
      this.setState(currentState => {
        return {
          stalls: stallsCopy,
        }
      });
    }
    else if (location === 'waiting') {
      this.setState(currentState => {
        return { inLine: num }
      });
    }
  }

  // in app
  updateAppMembers(members) {
    this.setState({
      pusher_app_members: members,
    });
  }

  // spy on a channel
  spyOn(channelName, location) {
    var channel = this.spy.subscribe(channelName);
    var stallId = null;
    if (location === 'stall') {
      stallId = channelName.split('-').pop();
    }
    console.log('trying to spy');
    console.log(channel);
    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`spying on ${channelName}`);
      this.updateMemberCount(this.countMembers(channel), location, stallId);
    });
    channel.bind("pusher:member_added", () => {
      this.updateMemberCount(this.countMembers(channel), location, stallId);
    });
    channel.bind("pusher:member_removed", () => {
      console.log(`someone left ${channelName}`);
      this.updateMemberCount(this.countMembers(channel), location, stallId);
    });
  };

  /* BEGIN: View transition functions
    -----------------------------------
  */
  // hallway -> bathroom
  handleEnterBathroom(e) {
    this.setState(currentState => {
      return {
        currentView: { type: 'waiting', id: null },
      }
    })
  }

  // bathroom -> stall
  handleEnterStall(e) {
    var stallEntered = false;
    this.pusher.unsubscribe('presence-bathroom');

    for (var i = 0; !stallEntered && i < this.state.stalls.length; i++) {
      var currentStall = {...this.state.stalls[i]};
      let stallId = i;
      if (currentStall.occupants < this.max_occupancy) {
        this.updateMemberCount(currentStall.occupants+1, 'stall', i);
        this.setState(currentState => {
          return {
            currentView: { type: 'stall', id: stallId },
          };
        });
        stallEntered = true;
      }
      else {
        console.log(`Stall ${i} full`);
      }
    }

    if (!stallEntered) {
      console.log('no vacant stalls available!');
      alert('no vacant stalls available!');
    }
  }

  render() {
    const stalls = this.state.stalls.map((stall) =>
      <li key={stall.id.toString()}>Stall {stall.id}: {stall.occupants}/{this.max_occupancy}</li>
    );

    let visitorsList = [];
    if (this.state.pusher_app_members.count > 0) {
      this.state.pusher_app_members.each((visitor) =>
        visitorsList.push(<li key={visitor.id.toString()}>{visitor.id}</li>)
      );
    }
    // default view is hallway
    let currentView = <Hallway onEnterBathroom={this.handleEnterBathroom} />
    if (this.state.currentView.type === 'waiting') {
      currentView = <WaitingRoom onEnterStall={this.handleEnterStall} pusher={this.pusher} onOccupancyChange={this.updateMemberCount} />;
    }
    if (this.state.currentView.type === 'stall') {
      currentView = <Stall id={this.state.currentView.id} pusher={this.pusher} max={this.max_occupancy} onOccupancyChange={this.updateMemberCount} />;
    }
    return (
      <div id="app">
        <div id="debug-console" className="hide">
          Number of Stalls: {this.num_stalls}<br/>
          <h3>Current Users: {this.state.pusher_app_members.count}</h3>
          <p><strong>In line:</strong> {this.state.inLine}</p>
          <h3>Stalls</h3>
          {stalls}<br/>
        </div>
        {currentView}
      </div>
    );
  }

}

export default App;