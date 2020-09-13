import React, { Component } from 'react';
import Stall from './Stall';
import Button from './Button';
import Mirrors from './Mirrors';
import Hotspots from './Hotspots';
import Chatbox from './Chatbox';
import Phone from './Phone';
import Note from './Note';
import Parallax from 'parallax-js';
import Audio from './Audio';
import Flush from './Flush';

import * as constants from './constants';

import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const navUpButton = `${constants.STATICURL}/actions/flat-arrow-up.png`;
const navDownButton = `${constants.STATICURL}/actions/flat-arrow-down.png`;
const navLeftButton = `${constants.STATICURL}/actions/flat-arrow-left.png`;
const navRightButton = `${constants.STATICURL}/actions/flat-arrow-right.png`;
const navBackButton = `${constants.STATICURL}/actions/flat-arrow-back.png`;
const navExitButton = `${constants.STATICURL}/actions/exit.png`;
const chatNotification = `${constants.STATICURL}/chat-notification.svg`;
const flushAudio = `${constants.STATICURL}/sounds/short-flush.mp3`;
const bgAudioSrc = `${constants.STATICURL}/sounds/inside.mp3`;

class Room extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.id = props.id;
    this.presenceChannel = null;
    this.me = null;
    this.state = {
      newAlert: false,
      occupants: {members: [],count: 0},
      userHex: '#ffffff',
      currentView: 'stall-front',
      showPhone: false,
      userName: 'a stallmate',
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
          userName: constants.PSEUDONYMS[parseInt(this.me) % constants.PSEUDONYMS.length],
          userHex: '#' + Math.floor(parseInt(this.presenceChannel.members.me.id)*16777215).toString(16).slice(-6)
        }
      });
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
        const audioElement = document.getElementById("notification-sound");
        audioElement.play();
        if (this.state.currentView !== 'stall-right') {
          this.setState({ newAlert: true });
        }
      }
    });
  }

  componentDidUpdate() {
    // console.log(`occupants in stall`);
    // console.log(this.state.occupants);
    constants.restartParallax('.layer');
    console.log('restarting parallax');
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
    if (target === 'stall-right') {
      this.setState({ currentView: target, newAlert: false })
    }
    else {
      this.setState({ currentView: target });
    }
  }

  render() {
    const stallFront = 
          <Stall direction="front" handleNavigationClick={this.handleNavigationClick} className={this.state.currentView === 'stall-front' ? 'bg-div' : 'hide'}>
            <Note />
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
    var currentView = null;
    const exit = <Button 
      className="nav-image"
      onClick={this.props.onExit}
      top="12vh"
      left="84vw"
      width="80px"
      imgSrc={navExitButton} 
      />;
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
        let seeSpider = this.me % 2 === 0 ? 'bg-layer' : 'hide';
        currentView = 
          <Stall direction="up" handleNavigationClick={this.handleNavigationClick} className="bg-div--responsive">
            <div id="hanging-spider" className={seeSpider}></div>
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Flush/Exit"
                imgSrc={navDownButton}
                top="87vh"
                left="57vw"
                 />
            </Hotspots>
          </Stall>;
        break;
      case 'stall-left':
        break;
      case 'stall-right': // contains chatbo
        break;
      case 'stall-down':
        currentView = 
          <Stall direction="down" handleNavigationClick={this.handleNavigationClick} className="bg-div">
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
        break;
      case 'stall-back':
        currentView = 
          <Stall direction="back" handleNavigationClick={this.handleNavigationClick} className="bg-div">
            <Hotspots>
              <Button 
                onClick={() => this.handleNavigationClick('stall-front')} 
                altText="Gaze at Stall Door"
                imgSrc={navBackButton}
                top="94vh"
                left="76vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-right')} 
                altText="Talk to Stranger"
                imgSrc={navLeftButton}
                top="53vh"
                left="10vw"
                 />
              <Button 
                onClick={() => this.handleNavigationClick('stall-left')} 
                altText="Check Phone"
                imgSrc={navRightButton}
                top="53vh"
                left="90vw"
                 />
              <Flush />
            </Hotspots>
          </Stall>;
        break;
      case 'mirrors':
        currentView =
          <Mirrors />;
      case 'stall-front':
      default:
        break;
    }
    var chatroomStall, phoneView;
    if (this.presenceChannel && this.me) {
      chatroomStall = <Stall className={this.state.currentView === 'stall-right' ? 'bg-div' : 'hide' } direction="right" handleNavigationClick={this.handleNavigationClick}>
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
                altText="Flush"
                imgSrc={navRightButton}
                top="53vh"
                left="90vw"
                 />
              <Chatbox userName={this.state.userName} occupants={this.state.occupants} userHex={this.state.userHex} channel={this.presenceChannel} />
            </Hotspots>
        </Stall>;
      phoneView = 
          <Stall direction="left" handleNavigationClick={this.handleNavigationClick} className={this.state.currentView === 'stall-left' ? 'bg-div--responsive' : 'hide' }>
            <Phone />
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
                altText="Flush"
                imgSrc={navLeftButton}
                top="53vh"
                left="10vw"
                 />
            </Hotspots>
          </Stall>;
    }
    return (
      <div className="view">
        <div className="hide">
          <h2>Room {this.id}: {this.countOccupants(this.state.occupants)} / {this.max_occupancy}</h2>
        </div>
        <Audio id="background-audio" audioSrc={bgAudioSrc} hidden="true" autoplay="true" loop={true} />
        <Audio id="flush-audio" audioSrc={flushAudio} hidden="true" />
        {currentView}
        {stallFront}
        {phoneView}
        {chatroomStall}
        {exit}
        {newMsg}
      </div>
    );
  }

}

export default Room;