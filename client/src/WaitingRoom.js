import React, { Component } from 'react';
import Button from './Button';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.state = {
      me: 0,
      occupants: { count: 0 },
    }
    this.countOccupants = this.countOccupants.bind(this);
    this.handleEnterStallClick = this.handleEnterStallClick.bind(this);
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe(`presence-bathroom`);
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.setState({ me: this.presenceChannel.members.me.id });
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_removed', () => {
      this.updateOccupants(this.presenceChannel.members);
      console.log(`WaitingRoom.js: someone left Stall ${this.id}`);
    });
  }

  // returns true count of occupants (excluding spies)
  countOccupants(members) {
    var count = 0;
    // console.log(`countOccupants() members in line:`);
    if (members.count > 0) {
      members.each(function (member) {
        if (!member.info.isSpy) { count++ }
      });
    }
    return count
  }

  updateOccupants(members) {
    console.log(`WaitingRoom.js updateOccupants: numOccupants ${members.count}`);
    this.setState({
      occupants: members,
    }, () => this.props.onOccupancyChange(this.countOccupants(members), 'waiting'));
  }


  handleEnterStallClick(e) {
    this.props.onEnterStall(e);
  }

  render() {
    let trueOccupants = [];
    let trueOccupantsList = [];
    if (this.state.occupants.count > 0) {
      this.state.occupants.each((visitor) => {
        if (!visitor.info.isSpy) {
          trueOccupants.push(visitor.id);
          trueOccupantsList.push(<li key={visitor.id.toString()}>{visitor.id}</li>);
        }
      });
    }
    let ahead = trueOccupants.length - trueOccupants.indexOf(this.state.me.toString()) - 1;
    let enterMessage = 'please wait...';
    if (ahead > 0) {
      enterMessage = `${ahead} ahead of you in line`;
    }
    else {
      enterMessage = <Button onClick={this.handleEnterStallClick} buttonText="Enter Stall" />;
    }

    return (
      <div id="waiting" className="view">
        <h2>Waiting Room</h2>
        In line: {this.countOccupants(this.state.occupants)}<br/>
        <ul>{trueOccupantsList}</ul>
        {enterMessage}
      </div>
    );
  }

}

export default WaitingRoom;