import React, { Component } from 'react';
import Stall from './Stall';
import Button from './Button';
import Mirrors from './Mirrors';
import Chatbox from './Chatbox';
// import StallUp from './StallUp';
// import StallLeft from './StallLeft';
// import StallRight from './StallRight';
// import StallDown from './StallDown';
// import StallBack from './StallBack';
import Parallax from 'parallax-js';
import navUpButton from './assets/actions/4_stare-at-ceiling.png';
import navDownButton from './assets/actions/4_cry.png';
import navLeftButton from './assets/actions/4_check-phone.png';
import navRightButton from './assets/actions/4_talk-to-stranger.png';
import navBackButton from './assets/actions/5_flush.png';

class Room extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.id = props.id;
    this.presenceChannel = null;
    this.me = null;
    this.state = {
      myStall: null,
      occupantsByStall: {},
      occupants: {count: 0},
      userHex: '#ffffff',
      currentView: 'stall-front',
    };
    this.max_occupancy = props.max;
    this.updateOccupants = this.updateOccupants.bind(this);
    this.countOccupants = this.countOccupants.bind(this);
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
    this.restartParallax = this.restartParallax.bind(this);
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe(`presence-room-${this.id}`);
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.me = this.presenceChannel.members.me.id;
      this.setState(currentState => {
        let stall = 0;
        let _occupantsByStall = {};
        let _myStall = null;
        var currentOccupants = this.presenceChannel.members.each((member) => {
          if (!member.info.isSpy) {
            _occupantsByStall[stall] = member.id;
            if (member.id === this.me) {
              _myStall = stall;
            }
            stall++;
          }
        });
        return {
          myStall: _myStall,
          occupantsByStall: _occupantsByStall,
          userHex: '#' + Math.floor(parseInt(this.presenceChannel.members.me.id)*16777215).toString(16).slice(-6)
        }
      });
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_added', (member) => {
      this.setState(currentState => {
        let _occupantsByStall = Object.assign({}, currentState.occupantsByStall);
        let stall = 0;
        while (_occupantsByStall[stall] && stall < this.max_occupancy) {
          stall++;
        }
        _occupantsByStall[stall] = member.id;
        return {
          occupantsByStall: _occupantsByStall,
        }
      });
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_removed', (member) => {
      this.setState(currentState => {
        let _occupantsByStall = Object.assign({}, currentState.occupantsByStall);
        let stall = 0;
        while (_occupantsByStall[stall] !== member.id && stall < this.max_occupancy) {
          stall++;
        }
        _occupantsByStall[stall] = null;
        return {
          occupantsByStall: _occupantsByStall,
        }
      });
      this.updateOccupants(this.presenceChannel.members);
      console.log(`Stall.js: ${member.id} left Stall ${this.id}`);
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

  restartParallax() {
    var container = document.getElementById('app');
    var parallaxInstance = new Parallax(container, {
      selector: '.layer',
      pointerEvents: true,
    });
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
    var currentView = 
          <Stall direction="front" handleNavigationClick={this.handleNavigationClick}>
            <Button 
              onClick={() => this.handleNavigationClick('stall-up')} 
              altText="Stare At Ceiling"
              imgSrc={navUpButton}
              width="20vw"
              top="20vh"
              left="50vw"
               />
            <Button 
              onClick={() => this.handleNavigationClick('stall-left')} 
              altText="Check Phone"
              imgSrc={navLeftButton}
              width="16vw"
              top="60vh"
              left="18vw"
               />
            <Button 
              onClick={() => this.handleNavigationClick('stall-down')} 
              altText="Cry"
              imgSrc={navDownButton}
              width="11vw"
              top="95vh"
              left="51vw"
               />
            <Button 
              onClick={() => this.handleNavigationClick('stall-right')} 
              altText="Talk to Stranger"
              imgSrc={navRightButton}
              width="23vw"
              top="66vh"
              left="85vw"
               />
            <Button 
              onClick={() => this.handleNavigationClick('stall-back')} 
              altText="Flush/Exit"
              imgSrc={navBackButton}
              width="23vw"
              top="77vh"
              left="70vw"
               />
          </Stall>;
    switch (this.state.currentView) {
      case 'stall-up':
        currentView = 
          <Stall direction="up" handleNavigationClick={this.handleNavigationClick}>
            <Button 
              onClick={() => this.handleNavigationClick('stall-front')} 
              altText="Flush/Exit"
              imgSrc={navBackButton}
              width="23vw"
              top="77vh"
              left="70vw"
               />
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-left':
        currentView = 
          <Stall direction="left" handleNavigationClick={this.handleNavigationClick}>
            <Button 
              onClick={() => this.handleNavigationClick('stall-front')} 
              altText="Flush/Exit"
              imgSrc={navBackButton}
              width="23vw"
              top="77vh"
              left="70vw"
               />
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-right': // contains chatbox
        currentView = 
          <Stall direction="right" handleNavigationClick={this.handleNavigationClick}>
            <Button 
              onClick={() => this.handleNavigationClick('stall-front')} 
              altText="Flush/Exit"
              imgSrc={navBackButton}
              width="23vw"
              top="77vh"
              left="70vw"
               />
            <Chatbox userHex={this.state.userHex} occupantsByStall={this.state.occupantsByStall} channel={this.presenceChannel} />
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-down':
        currentView = 
          <Stall direction="down" handleNavigationClick={this.handleNavigationClick}>
            <Button 
              onClick={() => this.handleNavigationClick('stall-front')} 
              altText="Flush/Exit"
              imgSrc={navBackButton}
              width="23vw"
              top="77vh"
              left="70vw"
               />
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-back':
        currentView = 
          <Mirrors />;
        this.restartParallax();
        break;
      case 'stall-front':
      default:
        this.restartParallax();
        break;
    }
    return (
      <div className="view">
        <div className="hide">
          <h2>Room {this.id}: {this.countOccupants(this.state.occupants)} / {this.max_occupancy}</h2>
        </div>
        {currentView}
      </div>
    );
  }

}

export default Room;