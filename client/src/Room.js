import React, { Component } from 'react';
import Stall from './Stall';
import Button from './Button';
import Mirrors from './Mirrors';
import Hotspots from './Hotspots';
import Chatbox from './Chatbox';
import Phone from './Phone';
import Parallax from 'parallax-js';
import navUpButton from './assets/actions/flat-arrow-up.png';
import navDownButton from './assets/actions/flat-arrow-down.png';
import navLeftButton from './assets/actions/flat-arrow-left.png';
import navRightButton from './assets/actions/flat-arrow-right.png';
import navBackButton from './assets/actions/flat-arrow-back.png';
import chatNotification from './assets/chat-notification.svg';
import phoneImg from './assets/fixed-phone.png';
import bigPhone from './assets/closeup-phone.gif';

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
      newAlert: false,
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
    this.togglePhone = this.togglePhone.bind(this);
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
    this.presenceChannel.bind('message', (data) => {
      if (data.userId !== this.presenceChannel.members.me.id) {
        const audioElement = document.getElementsByClassName("audio")[0];
        audioElement.play();
        if (this.state.currentView !== 'stall-right') {
          this.setState({ newAlert: true });
        }
      }
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

  togglePhone() {

  }

  updateOccupants(members) {
    // console.log(`Stall.js updateOccupants: stall id ${this.id}, numOccupants ${members.count}`);
    this.setState({
      occupants: members,
    }, () => this.props.onOccupancyChange(this.countOccupants(members), 'room', this.id));
  }

  handleNavigationClick(target) {
    if (target === 'stall-right') {
      this.setState({ currentView: target, newAlert: false })
    }
    else {
      this.setState({ currentView: target });
    }
  }

  render() {
    var currentView = 
          <Stall direction="front" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-up')} 
                altText="Stare At Ceiling"
                imgSrc={navUpButton}
                top="7vh"
                left="50vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-left')} 
                altText="Check Phone"
                imgSrc={navLeftButton}
                top="53vh"
                left="10vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-down')} 
                altText="Cry"
                imgSrc={navDownButton}
                top="88vh"
                left="50vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-right')} 
                altText="Talk to Stranger"
                imgSrc={navRightButton}
                top="53vh"
                left="90vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-back')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                top="98vh"
                left="23vw"
                 />
            </Hotspots>
          </Stall>;
    const newMsg = <Button 
      className={this.state.newAlert ? "blue-glow msg-alert" : "hide"}
      onClick={() => this.handleNavigationClick('stall-right')}
      top="90vh"
      left="90vw"
      width="80px"
      imgSrc={chatNotification} 
      />;
    switch (this.state.currentView) {
      case 'stall-up':
        currentView = 
          <Stall direction="up" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                top="87vh"
                left="77vw"
                 />
            </Hotspots>
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-left':
        currentView = 
          <Stall direction="left" handleNavigationClick={this.handleNavigationClick}>
            <Phone onClick={() => this.togglePhone()} />
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-up')} 
                altText="Stare At Ceiling"
                imgSrc={navUpButton}
                top="7vh"
                left="50vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-down')} 
                altText="Cry"
                imgSrc={navDownButton}
                top="88vh"
                left="50vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Gaze at Stall"
                imgSrc={navRightButton}
                top="53vh"
                left="90vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-back')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                top="93vh"
                left="10vw"
                 />
            </Hotspots>
          </Stall>;
        this.restartParallax();
        break;
      case 'stall-right': // contains chatbox
        // currentView = 
        //   <Stall direction="right" handleNavigationClick={this.handleNavigationClick}>
        //     <Hotspots>
        //       <Button 
        //         onClick={() => this.handleNavigationClick('stall-up')} 
        //         altText="Stare At Ceiling"
        //         imgSrc={navUpButton}
        //         top="7vh"
        //         left="50vw"
        //          />
        //       <Button 
        //         onClick={() => this.handleNavigationClick('stall-down')} 
        //         altText="Cry"
        //         imgSrc={navDownButton}
        //         top="88vh"
        //         left="50vw"
        //          />
        //       <Button 
        //         onClick={() => this.handleNavigationClick('stall-front')} 
        //         altText="Gaze at Stall"
        //         imgSrc={navLeftButton}
        //         top="53vh"
        //         left="10vw"
        //          />
        //       <Button 
        //         onClick={() => this.handleNavigationClick('stall-back')} 
        //         altText="Flush/Exit"
        //         imgSrc={navBackButton}
        //         top="93vh"
        //         left="83vw"
        //          />
        //       <Chatbox userName={this.state.userName} userHex={this.state.userHex} occupantsByStall={this.state.occupantsByStall} channel={this.presenceChannel} />
        //     </Hotspots>
        //   </Stall>;
        this.restartParallax();
        break;
      case 'stall-down':
        currentView = 
          <Stall direction="down" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Gaze at Stall Door"
                imgSrc={navUpButton}
                top="7vh"
                left="50vw"
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
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Gaze at Stall Door"
                imgSrc={navBackButton}
                top="94vh"
                left="76vw"
                 />
              <Button 
                onClick={this.props.onExit} 
                altText="Flush/Exit"
                className="neon"
                top="43vh"
                left="39vw"
                >
                Flush
              </Button>
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
    var chatroomStall;
    if (this.presenceChannel && this.me) {
      chatroomStall = <Stall className={this.state.currentView === 'stall-right' ? '' : 'hide' } direction="right" handleNavigationClick={this.handleNavigationClick}>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-up')} 
                altText="Stare At Ceiling"
                imgSrc={navUpButton}
                top="7vh"
                left="50vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-down')} 
                altText="Cry"
                imgSrc={navDownButton}
                top="88vh"
                left="50vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Gaze at Stall"
                imgSrc={navLeftButton}
                top="53vh"
                left="10vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-back')} 
                altText="Flush/Exit"
                imgSrc={navBackButton}
                top="93vh"
                left="83vw"
                 />
              <Chatbox userName={this.state.userName} userHex={this.state.userHex} channel={this.presenceChannel} />
            </Hotspots>
        </Stall>;
    }
    return (
      <div className="view">
        <div className="hide">
          <h2>Room {this.id}: {this.countOccupants(this.state.occupants)} / {this.max_occupancy}</h2>
        </div>
        {currentView}
        {chatroomStall}
        {newMsg}
      </div>
    );
  }

}

export default Room;