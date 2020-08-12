import React, { PureComponent } from 'react';
import Button from './Button';
import Chatbox from './Chatbox';
import navUpButton from './assets/actions/4_stare-at-ceiling.png';
import navDownButton from './assets/actions/4_cry.png';
import navLeftButton from './assets/actions/4_check-phone.png';
import navRightButton from './assets/actions/4_talk-to-stranger.png';
import navBackButton from './assets/actions/5_flush.png';

export default class RoomRight extends PureComponent {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.userHex = props.userHex;
    this.myId = props.myId;
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  handleNavigationClick(target) {
    this.props.handleNavigationClick(target);
  }

  render() {
    return (
      <div id="stall-right" className="view layer" data-depth="0.2">
        <div className="content">
          <div className="hotspots layer" data-depth="0.1">
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
            <Chatbox userHex={this.userHex} occupantsByStall={this.props.occupantsByStall} channel={this.channel} myId={this.myId} />
          </div>
        </div>
      </div>
    );
  }

}
