import React, { Component } from 'react';
import Button from './Button';
import enterStallButton from './assets/actions/3_enter-stall.png';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.state = {
      me: 0,
      occupants: { count: 0 },
    }
    this.countOccupants = this.countOccupants.bind(this);
    this.sortByEntryTime = this.sortByEntryTime.bind(this);
    this.handleEnterRoomClick = this.handleEnterRoomClick.bind(this);
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
      console.log(`WaitingRoom.js: someone left Room ${this.id}`);
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


  handleEnterRoomClick(e) {
    this.props.onEnterRoom(e);
  }

  sortByEntryTime(occupants) {
    let sorted = []
    occupants.forEach((member) => {
      sorted.push(member);
    });
    return sorted.sort((a,b) => {
      if (parseInt(a.info.entry_time) < parseInt(b.info.entry_time)) { return -1 }
      if (parseInt(a.info.entry_time) > parseInt(b.info.entry_time)) { return 1 }
      return 0
    });
  }

  render() {
    let trueOccupants = [];
    let trueOccupantsList = [];
    const positioningCss = {
      top: "50vh",
      left: "60vw",
      width: "300px",
      position: "relative",
    };
    if (this.state.occupants.count > 0) {
      this.state.occupants.each((visitor) => {
        if (!visitor.info.isSpy) {
          trueOccupants.push(visitor);
          if (visitor.id.toString() === this.state.me.toString()) {
            trueOccupantsList.push(<li key={visitor.id.toString()}><strong>{visitor.id}</strong> ({visitor.info.entry_time})</li>);
          }
          else {
            trueOccupantsList.push(<li key={visitor.id.toString()}>{visitor.id} ({visitor.info.entry_time})</li>);
          }
        }
      });
      trueOccupants = this.sortByEntryTime(trueOccupants);
    }
    
    let ahead = trueOccupants.map((e) => { return e.id.toString() }).indexOf(this.state.me.toString());
    let enterMessage = 'please wait...';
    if (ahead > 0) {
      enterMessage = <div className="please-wait" style={positioningCss}>PLEASE WAIT...<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ahead} ahead of you in line</div>;
    }
    else {
      enterMessage = <Button onClick={this.handleEnterRoomClick} altText="Enter Stall" imgSrc={enterStallButton} top={positioningCss.top} left={positioningCss.left} width={positioningCss.width} />;
    }
    console.log('In line:');
    console.log(`\t${this.countOccupants(this.state.occupants)}`)
    return (
      <div className="view layer" data-depth="0.1">
        <div id="waiting" className="content">
          <div className="hotspots layer" data-depth="0.1">
            {enterMessage}
          </div>
        </div>
      </div>
    );
  }

}

export default WaitingRoom;