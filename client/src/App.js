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
    this.state = {
      currentViewType: 'waiting',
      currentView: null,
      stalls: [], // array of Stall components
      pusher_app_members: [], // pusher members object
      /*
        [
          ...
          { id: int, stall: int }
        ]
       */
      stall_occupants: [],
    };
    this.max_occupancy = 2; // ADJUST AS NEEDED
    this.num_stalls = 1; // ADJUST AS NEEDED
    this.handleEnterStall = this.handleEnterStall.bind(this);
    this.updateOccupants = this.updateOccupants.bind(this);
  }

  handleEnterStall(e) {
    var stallEntered = false;

    for (var i = 0; !stallEntered && i < this.state.stalls.length; i++) {
      var currentStall = {...this.state.stalls[i]};
      let stallId = i;
      if (currentStall.occupants < this.max_occupancy) {
        this.updateOccupants(i, currentStall.occupants+1);
        this.setState(currentState => {
          return {
            currentViewType: 'stall',
            currentView: <Stall id={stallId} pusher={this.pusher} max={this.max_occupancy} onOccupancyChange={this.updateOccupants} />,
          };
        });
        stallEntered = true;
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
    stallsCopy[stallId]['occupants'] = numOccupants;
    this.setState(currentState => {
      return {
        stalls: stallsCopy,
      }
    });
  }

  // in line
  updateVisitors(members) {
    this.setState({
      pusher_app_members: members,
    });
  }

  componentDidMount() {
    // create stalls
    var stallList = [];
    for (var i = 0; i < this.num_stalls; i++) {
      let stall = { id: i, occupants: 0 };
      stallList.push(stall);
    }

    this.setState(currentState => {
      return {
        stalls: stallList,
      }
    })

    // main app channel
    this.presenceChannel = this.pusher.subscribe('presence-bathroom');
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.updateVisitors(this.presenceChannel.members);
      // in WaitingRoom by default
      this.setState(currentState => {
        return {
          currentViewType: 'waiting',
          currentView: <WaitingRoom onEnterStall={this.handleEnterStall} pusher={this.pusher} pusher_app_members={this.state.pusher_app_members} />
        };
      });
      // console.log(this.presenceChannel.members.me.id + ' subscribed to WaitingRoom');
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateVisitors(this.presenceChannel.members);
      console.log(this.state.currentViewType);
      if (this.state.currentViewType === 'waiting') {
        this.setState(currentState => {
          return {
            currentView: <WaitingRoom onEnterStall={this.handleEnterStall} pusher={this.pusher} pusher_app_members={this.state.pusher_app_members} />
          };
        });
      }
      // console.log('someone joined Bathroom App');
    });
    this.presenceChannel.bind('pusher:member_removed', (member) => {
      this.updateVisitors(this.presenceChannel.members);
      if (this.state.currentViewType === 'waiting') {
        this.setState(currentState => {
          return {
            currentView: <WaitingRoom onEnterStall={this.handleEnterStall} pusher={this.pusher} pusher_app_members={this.state.pusher_app_members} />
          };
        });
      }
      console.log(`${member.id} left Bathroom App`);
    });
    // someone joined a stall
    this.presenceChannel.bind('subscribed-stall', data => {
      // console.log(`${data.userId} joined Stall ${data.stallId}`);
      this.updateOccupants(data.stallId, data.currentOccupants);
    });
    // someone left a stall
    this.presenceChannel.bind('left-stall', data => {
      console.log(`App.js: someone left Stall ${data.stallId}`);
      this.updateOccupants(data.stallId, data.currentOccupants);
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('presence-bathroom');
    this.presenceChannel.unbind(); // remove all handlers defined in DidMount()
  }

  render() {
    const stalls = this.state.stalls.map((stall) =>
      <li key={stall.id.toString()}>Stall {stall.id}: {stall.occupants}/{this.max_occupancy}</li>
    );
    return (
      <div id="app">
        Number of Stalls: {this.num_stalls}<br/>
        {stalls}<br/>
        {this.state.currentView}
      </div>
    );
  }

}

export default App;