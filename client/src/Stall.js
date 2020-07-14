import React, { Component } from 'react';
// import Pusher from 'pusher-js';

class Stall extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.id = props.id;
    this.presenceChannel = null;
    this.state = {
      occupants: {count: 0},
      userHex: '#ffffff',
    };
    this.max_occupancy = props.max;
    this.updateOccupants = this.updateOccupants.bind(this);
    this.countOccupants = this.countOccupants.bind(this);
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe(`presence-stall-${this.id}`);
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.setState(currentState => {
        return {userHex: '#' + Math.floor(parseInt(this.presenceChannel.members.me.id)*16777215).toString(16).slice(-6)}
      });
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_removed', () => {
      this.updateOccupants(this.presenceChannel.members);
      console.log(`Stall.js: someone left Stall ${this.id}`);
    });
  }

  // returns true count of occupants (excluding spies)
  countOccupants(members) {
    var count = 0;
    console.log(`countOccupants() members in stall ${this.id}:`);
    if (members.count > 0) {
      members.each(function (member) {
        if (!member.info.isSpy) { count++ }
      });
    }
    return count
  }

  updateOccupants(members) {
    console.log(`Stall.js updateOccupants: stall id ${this.id}, numOccupants ${members.count}`);
    this.setState({
      occupants: members,
    }, () => this.props.onOccupancyChange(this.id, this.countOccupants(members)));
  }

  render() {
    const colorStyle = {
      color: this.state.userHex,
    }
    return (
      <div id="stall" className="component-box" style={colorStyle}>
        <h2>Stall {this.id}</h2>
        Stall: {this.countOccupants(this.state.occupants)} / {this.max_occupancy}
      </div>
    );
  }

}

export default Stall;