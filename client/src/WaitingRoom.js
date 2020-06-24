import React, { Component } from 'react';
import Pusher from 'pusher-js';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitors: [],
    };
  }

  componentDidMount() {
    const pusher = new Pusher('93d5b6db6095187f5ef6', {
      cluster: 'us2',
      encrypted: true,
    });

    const presenceChannel = pusher.subscribe('presence-bathroomQueue');
    presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.updateVisitors(presenceChannel.members);
    });
    presenceChannel.bind('pusher:member_added', () => {
      this.updateVisitors(presenceChannel.members);
    });
    presenceChannel.bind('pusher:member_removed', () => {
      this.updateVisitors(presenceChannel.members);
    });
     
  }

  updateVisitors(members) {
    this.setState({
      visitors: members,
    })
  }

  render() {
    return (
      <div id="users">
        Currently online: {this.state.visitors.count}
      </div>
    );
  }

}

export default WaitingRoom;