import React, { Component } from 'react';
import Stall from './Stall';
import Button from './Button';
import Mirrors from './Mirrors';
import Hotspots from './Hotspots';
import Chatbox from './Chatbox';
import Phone from './Phone';
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
import phoneImg from './assets/fixed-phone.png';

const PSEUDONYMS = [
  'someone',
  'somebody',
  'a stallmate',
  'a person',
  'another person',
  'person in next stall',
  'some person',
];

class Room extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.id = props.id;
    this.presenceChannel = null;
    this.me = null;
    this.state = {
      occupantsByStall: {},
      occupants: {count: 0},
      userHex: '#ffffff',
      currentView: 'stall-front',
      userName: 'someone',
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
        return {
          userName: PSEUDONYMS[parseInt(this.me) % PSEUDONYMS.length],
          userHex: '#' + Math.floor(parseInt(this.presenceChannel.members.me.id)*16777215).toString(16).slice(-6)
        }
      }, console.log(`my username: ${this.state.userName}`));
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_added', (member) => {
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_removed', (member) => {
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
            <Hotspots>
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
            </Hotspots>
          </Stall>;
    switch (this.state.currentView) {
      case 'stall-up':
        currentView = 
          <Stall direction="up" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                width="23vw"
                top="77vh"
                left="70vw"
                 />
            </Hotspots>
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-left':
        currentView = 
          <Stall direction="left" handleNavigationClick={this.handleNavigationClick}>
            <Phone />
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                width="23vw"
                top="77vh"
                left="70vw"
                 />
            </Hotspots>
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-right': // contains chatbox
        currentView = 
          <Stall direction="right" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                width="23vw"
                top="77vh"
                left="70vw"
                 />
              <Chatbox userName={this.state.userName} userHex={this.state.userHex} occupantsByStall={this.state.occupantsByStall} channel={this.presenceChannel} />
            </Hotspots>
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-down':
        currentView = 
          <Stall direction="down" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                width="23vw"
                top="77vh"
                left="70vw"
                 />
            </Hotspots>
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-back':
        currentView = 
          <Stall direction="back" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('mirrors')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                width="23vw"
                top="41vh"
                left="43vw"
                 />
            </Hotspots>
          </Stall>;
        this.restartParallax();
        break;
      case 'mirrors':
        currentView =
          <Mirrors />;
          this.restartParallax();
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