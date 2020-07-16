import React, { Component } from 'react';
import StallFront from './StallFront';
import StallUp from './StallUp';
import StallLeft from './StallLeft';
import StallRight from './StallRight';
import StallDown from './StallDown';
import StallBack from './StallBack';

class Stall extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.id = props.id;
    this.presenceChannel = null;
    this.me = null;
    this.state = {
      occupants: {count: 0},
      userHex: '#ffffff',
      currentView: 'stall-front',
    };
    this.max_occupancy = props.max;
    this.updateOccupants = this.updateOccupants.bind(this);
    this.countOccupants = this.countOccupants.bind(this);
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe(`presence-room-${this.id}`);
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.me = this.presenceChannel.members.me.id;
      this.setState(currentState => {
        return {
          userHex: '#' + Math.floor(parseInt(this.presenceChannel.members.me.id)*16777215).toString(16).slice(-6)
        }
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
    // console.log(`countOccupants() members in stall ${this.id}:`);
    if (members.count > 0) {
      members.each(function (member) {
        if (!member.info.isSpy) { count++ }
      });
    }
    return count
  }

  updateOccupants(members) {
    // console.log(`Stall.js updateOccupants: stall id ${this.id}, numOccupants ${members.count}`);
    this.setState({
      occupants: members,
    }, () => this.props.onOccupancyChange(this.countOccupants(members), 'room', this.id));
  }

  handleNavigationClick(target) {
    this.setState({ currentView: target });
  }

  render() {
    const colorStyle = {
      color: this.state.userHex,
    }
    var currentView = <StallFront handleNavigationClick={this.handleNavigationClick} />;
    switch (this.state.currentView) {
      case 'stall-up':
        currentView = <StallUp handleNavigationClick={this.handleNavigationClick} />;
        break;
      case 'stall-left':
        currentView = <StallLeft handleNavigationClick={this.handleNavigationClick} />;
        break;
      case 'stall-right': // contains chatbox
        currentView = <StallRight channel={this.presenceChannel} userHex={this.state.userHex} handleNavigationClick={this.handleNavigationClick} />;
        break;
      case 'stall-down':
        currentView = <StallDown handleNavigationClick={this.handleNavigationClick} />;
        break;
      case 'stall-back':
        currentView = <StallBack handleNavigationClick={this.handleNavigationClick} />;
        break;
      case 'stall-front':
      default:
        currentView = <StallFront handleNavigationClick={this.handleNavigationClick} />;
        break;
    }
    return (
      <div id="room">
        <h2>Room {this.id}: {this.countOccupants(this.state.occupants)} / {this.max_occupancy}</h2>
        {currentView}
      </div>
    );
  }

}

export default Stall;