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
      currentView: null,
      stalls: [],
    };
    this.max_occupancy = 1; // ADJUST AS NEEDED
    this.num_stalls = 1; // ADJUST AS NEEDED
    this.handleEnterStall = this.handleEnterStall.bind(this);
    // this.handleVacancyChange = this.handleVacancyChange.bind(this);
  }

  handleEnterStall(e) {
    var stallList = Array.from(this.state.stalls);
    var stallEntered = false;

    for (var i = this.state.stalls.length - 1; !stallEntered && i >= 0; i--) {
      var currentStall = this.state.stalls[i];
      if (currentStall.props.vacant == "true") {
        this.setState(currentState => {
          return {
            currentView: currentStall,
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

    // this.stallChannel = this.pusher.subscribe('presence-stall-1');
    // this.stallChannel.bind('pusher:subscription_succeeded', () => {
    //   console.log(this.stallChannel.members.me.id + ' joined stall 1');
    //   this.setState({
    //     stalls: {'1': this.stallChannel.members},
    //   },
    //   console.log(this.stallChannel.members));
    // });
  }

  componentWillMount() {
    // create stalls
    var stallList = [];
    for (var i = 0; i < this.num_stalls; i++) {
      var stallId = i;
      let stallComponent = <Stall id={stallId} pusher={this.pusher} max={this.max_occupancy} vacant="true"/>;
      stallList.push(stallComponent);
    }
    this.setState(currentState => {
      return {
        stalls: stallList,
        currentView: <WaitingRoom onEnterStall={this.handleEnterStall} pusher={this.pusher} />
      };
    });
  }

  // componentDidMount() {
  // }

  // componentWillUnmount() {
  // }

  // updateVisitors(members) {
  //   this.setState({
  //     visitors: members,
  //   },
  //   // console.log('number of visitors updated')
  //   )
  // }

  render() {
    const stalls = this.state.stalls.map((stall) =>
      <li>Stall {stall.props.id} vacant? {stall.props.vacant}</li>
    );
    return (
      <div id="app">
        Number of Stalls: {this.num_stalls}<br/>
        {this.state.currentView}
      </div>
    );
  }

}

export default App;