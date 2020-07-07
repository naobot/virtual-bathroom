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
      stalls: [], // array of Stall components
    };
    this.max_occupancy = 1; // ADJUST AS NEEDED
    this.num_stalls = 2; // ADJUST AS NEEDED
    this.handleEnterStall = this.handleEnterStall.bind(this);
    this.updateOccupants = this.updateOccupants.bind(this);
  }

  handleEnterStall(e) {
    var stallEntered = false;

    for (var i = 0; !stallEntered && i < this.state.stalls.length; i++) {
      var currentStall = {...this.state.stalls[i]};
      let stallId = i;
      if (currentStall.occupants < this.max_occupancy) {
        // this.updateOccupants(i, currentStall.occupants+1);
        this.setState(currentState => {
          return {
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

  updateOccupants(stallId, numOccupants) {
    var stallsCopy = Array.from(this.state.stalls);
    stallsCopy[stallId].occupants = numOccupants;
    console.log(stallsCopy);
    this.setState(currentState => {
      return {
        stalls: stallsCopy,
      }
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
        currentView: <WaitingRoom onEnterStall={this.handleEnterStall} pusher={this.pusher} />
      };
    });
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