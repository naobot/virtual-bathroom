import React, { PureComponent } from 'react';
import Background from './Background';
import Button from './Button';
import Audio from './Audio';

import * as constants from './constants';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const enterStallButton = `${constants.STATICURL}/actions/perspective-round-arrow-up.png`;
// const enterStallButton = `${constants.STATICURL}/actions/3_enter-stall.png`;
const audioSrc = `${constants.STATICURL}/sounds/outside.mp3`;
const backgroundImgSrc = `${constants.STATICURL}/images/bg-waiting-closed.jpg`;
const vacancyAudioSrc = `${constants.STATICURL}/sounds/eventually.mp3`;
const animatedBackground = `${constants.STATICURL}/images/bg-waiting-opening.gif`;

class WaitingRoom extends PureComponent {
  render() {
    const positioningCss = {
      top: "86vh",
      left: "58vw",
      position: "absolute",
    };

    let enterMessage;
    let backgroundImg = backgroundImgSrc;
    if (this.props.queuePosition > 0 || this.props.queuePosition === 0) {
      console.log(`Currently ${this.props.queuePosition}/${this.props.inLineTotal}`);
      if (this.props.queuePosition > 2) {
        enterMessage = <div className="please-wait neon">&nbsp;&nbsp;Sorry, all stalls are occupied right now.<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;There are {this.props.queuePosition} ahead of you in line. Please wait.</div>;
      }
      else { // == 0
        if (this.props.currentVacancies > 0) {
          backgroundImg = animatedBackground;
          enterMessage = <>
              <Audio id="enter-sound" audioSrc={vacancyAudioSrc} hidden="true" autoplay="true" />
              <Button className="arrow--enter-stall blue-glow" onClick={this.props.handleEnterRoomClick} altText="Enter Stall" imgSrc={enterStallButton} top={positioningCss.top} left={positioningCss.left}  />
            </>;
        }
        else {
          enterMessage = <div className="please-wait neon">&nbsp;&nbsp;Sorry, all stalls are occupied right now.<br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;It looks like it will be your turn soon, though. Please wait.</div>;
        }
      }
    }
    else {
      enterMessage = <div className="please-wait neon" style={positioningCss}>please wait...</div>;
    }
    
    const backgroundAudio = <Audio id="background-audio" audioSrc={audioSrc} hidden="true" autoplay="true" loop={true} />;
    return (
      <Background id="waiting" imgSrc={backgroundImg}>
        {backgroundAudio}
        <div className="hotspots">
          {enterMessage}
        </div>
      </Background>
    );
  }

}

export default WaitingRoom;