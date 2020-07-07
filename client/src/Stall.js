import React, { Component } from 'react';
// import Pusher from 'pusher-js';

class Stall extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.presenceChannel = null;
    this.state = {
      occupants: {count: 0},
      vacant: this.props.vacant,
    };
    this.max_occupancy = props.max;
    this.handleOccupancyChange = this.updateOccupants.bind(this);
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe('presence-stall');
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
    var isVacant = members.count < this.max_occupancy;
    this.setState({
      occupants: members,
      vacant: isVacant,
    })
  }

  render() {
    const vacant = this.state.vacant;
    return (
      <div id="stall">
        Stall: {this.state.occupants.count} / {this.max_occupancy}
      </div>
    );
  }

}

export default Stall;