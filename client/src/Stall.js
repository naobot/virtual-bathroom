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
    };
    this.max_occupancy = props.max;
    this.handleOccupancyChange = this.updateOccupants.bind(this);
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe(`presence-stall-${this.id}`);
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.updateOccupants(this.presenceChannel.members);
      console.log(this.presenceChannel.members.me.id + ' joined Stall');
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_removed', () => {
      this.updateOccupants(this.presenceChannel.members);
      console.log('someone left Stall');
    });
  }

  updateOccupants(members) {
    console.log(`Stall.js updateOccupants: stall id ${this.id}, numOccupants ${members.count}`);
    this.setState({
      occupants: members,
    }, () => this.props.onOccupancyChange(this.id, members.count));
  }

  render() {
    return (
      <div id="stall">
        Stall: {this.state.occupants.count} / {this.max_occupancy}
      </div>
    );
  }

}

export default Stall;