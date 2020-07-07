import React, { Component } from 'react';
// import Pusher from 'pusher-js';
// import axios from 'axios';
// import Stall from './Stall';
import EnterStall from './EnterStall';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.presenceChannel = null;
    this.state = {
      visitors: [], // pusher members object
      visitorList: [], // member id array
    };
    this.handleEnterStallClick = this.handleEnterStallClick.bind(this);
  }

  handleEnterStallClick(e) {
    this.props.onEnterStall(e);
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
    
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe('presence-bathroom');
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.updateVisitors(this.presenceChannel.members);
      // console.log(this.presenceChannel.members.me.id + ' joined WaitingRoom');
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateVisitors(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_removed', () => {
      this.updateVisitors(this.presenceChannel.members);
      // console.log('someone left WaitingRoom');
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('presence-bathroom');
    this.presenceChannel.unbind(); // remove all handlers defined in DidMount()
    // console.log('unmounting WaitingRoom');
  }

  updateVisitors(members) {
    this.setState({
      visitors: members,
    },
    () => {
      var membersList = [];
      members.each((member) => {
        membersList.push(member.id);
      });
      this.setState({ visitorList: membersList });
    }
    // console.log('number of visitors updated')
    )
  }

  render() {
    let visitorsList = null;
    if (this.state.visitors !== []) {
      visitorsList = this.state.visitorList.map((visitor) => 
        <li>{visitor}</li>
      );
    }
    return (
      <div id="waiting">
        In line: {this.state.visitors.count}<br/>
        <ul>{visitorsList}</ul>
        <EnterStall onClick={this.handleEnterStallClick} />
      </div>
    );
  }

}

export default WaitingRoom;