import React, { Component } from 'react';
import Pusher from 'pusher-js';
import WaitingRoom from './WaitingRoom';
import Stall from './Stall';

class App extends Component {
  constructor(props) {
    super(props);
    this.pusher = new Pusher('93d5b6db6095187f5ef6', {
      cluster: 'us2',
      encrypted: true,
    });
    this.spy = new Pusher('93d5b6db6095187f5ef6', {
      encrypted: true,
      cluster: 'us2',
      auth: {
        params: {
          isSpy: true
        }
      }
    });
    this.me = null;
    this.state = {
      currentView: { type: 'waiting', id: null },
      stalls: [], // object of Stall components
      pusher_app_members: { count: 0 }, // pusher members object
      message: '',
    };
    this.max_occupancy = 1; // ADJUST AS NEEDED
    this.num_stalls = 2; // ADJUST AS NEEDED
    this.countMembers = this.countMembers.bind(this);
    this.spyOn = this.spyOn.bind(this);
    this.handleEnterStall = this.handleEnterStall.bind(this);
    this.updateOccupants = this.updateOccupants.bind(this);
  }


  componentDidMount() {
    for (var i = 0; i < this.num_stalls; i++) {
      this.spyOn(`presence-stall-${i}`);
    }
    // main app channel
    this.presenceChannel = this.pusher.subscribe('presence-bathroom');
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.me = this.presenceChannel.members.me.id;
      this.updateAppMembers(this.presenceChannel.members);
      // console.log(this.presenceChannel.members.me.id + ' subscribed to WaitingRoom');
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateAppMembers(this.presenceChannel.members);
      console.log(`currentViewType: ${this.state.currentViewType}`);
      // console.log('someone joined Bathroom App');
    });
    // someone left App
    this.presenceChannel.bind('pusher:member_removed', (member) => {
      this.updateAppMembers(this.presenceChannel.members);
      console.log(`${member.id} left Bathroom App`);
    });
  }

  // componentDidUpdate() {
  //   console.log('App updated');
  // }

  componentWillUnmount() {
    this.pusher.unsubscribe('presence-bathroom');
  }

  // returns a the number of members connected to channel
  // excluding spies
  countMembers(channel) {
    // console.log("Current users in " + channel.name + ":");
    var count = 0;
    var stallId = channel.name.split('-').pop();
    channel.members.each(function (member) {
      if (!member.info.isSpy) { console.log("user: " + member.id); count++; }
    });
    return count
  };

  // spy on a channel
  spyOn(channelName) {
    var channel = this.spy.subscribe(channelName);
    var stallId = channelName.split('-').pop();
    // console.log('trying to spy');
    // console.log(channel);
    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`spying on ${channelName}`);
      this.setState(currentState => {
        var stallsCopy = Array.from(currentState.stalls);
        stallsCopy[stallId] = { id: stallId, occupants: this.countMembers(channel) };
        return {
          stalls: stallsCopy,
        }
      })
    });
    channel.bind("pusher:member_added", () => {
      this.updateOccupants(stallId, this.countMembers(channel));
    });
    channel.bind("pusher:member_removed", () => {
      this.updateOccupants(stallId, this.countMembers(channel));
    });
  };

  handleEnterStall(e) {
    var stallEntered = false;

    for (var i = 0; !stallEntered && i < this.state.stalls.length; i++) {
      var currentStall = {...this.state.stalls[i]};
      let stallId = i;
      if (currentStall.occupants < this.max_occupancy) {
        this.updateOccupants(i, currentStall.occupants+1);
        this.setState(currentState => {
          return {
            currentView: { type: 'stall', id: stallId },
          };
        });
        stallEntered = true;
        console.log(this.occupant_dict);
      }
      else {
        console.log(`Stall ${i} full`);
      }
    }

    if (!stallEntered) {
      alert('no vacant stalls available!');
    }

  }

  // in stall
  updateOccupants(stallId, numOccupants) {
    var stallsCopy = Array.from(this.state.stalls);
    console.log(stallsCopy);
    console.log(`stallId: ${stallId}`);
    stallsCopy[stallId] = { id: stallId, occupants: numOccupants };
    this.setState(currentState => {
      return {
        stalls: stallsCopy,
      }
    });
  }

  // in line
  updateAppMembers(members) {
    this.setState({
      pusher_app_members: members,
    });
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
    let in_stall = this.state.stalls.map((stall) => stall.occupants).reduce((a,b)=>a+b, 0);
    let in_line = this.state.pusher_app_members.count-in_stall;
    // default view is waiting room
    let currentView = <WaitingRoom onEnterStall={this.handleEnterStall} inLine={in_line} />;
    if (this.state.currentView.type === 'stall') {
      currentView = <Stall id={this.state.currentView.id} pusher={this.pusher} max={this.max_occupancy} onOccupancyChange={this.updateOccupants} />;
    }
    return (
      <div id="app" className="component-box">
        Number of Stalls: {this.num_stalls}<br/>
        <h3>Current Users</h3>
        <p><strong>In line:</strong> {in_line}</p>
        <p><strong>In app:</strong> {this.state.pusher_app_members.count}</p>
        <ul>{visitorsList}</ul>
        <h3>Stalls</h3>
        {stalls}<br/>
        {currentView}
      </div>
    );
  }

}

export default App;