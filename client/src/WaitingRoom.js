import React, { PureComponent } from 'react';
import Background from './Background';
import Button from './Button';
import enterStallButton from './assets/actions/perspective-round-arrow-up.png';
// import enterStallButton from './assets/actions/3_enter-stall.png';
import Audio from './Audio';
import audioSrc from './assets/sounds/outside.mp3';
import backgroundImgSrc from './assets/images/bg-waiting.jpg';
import vacancyAudioSrc from './assets/sounds/eventually.mp3';

class WaitingRoom extends PureComponent {
  render() {
    const positioningCss = {
      top: "86vh",
      left: "58vw",
      position: "absolute",
    };

    let enterMessage;
    if (this.props.queuePosition > 0 || this.props.queuePosition === 0) {
      console.log(`Currently ${this.props.queuePosition}/${this.props.inLineTotal}`);
      if (this.props.queuePosition > 2) {
        enterMessage = <div className="please-wait neon">&nbsp;&nbsp;Sorry, all stalls are occupied right now.<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;There are {this.props.queuePosition} ahead of you in line. Please wait.</div>;
      }
      else { // == 0
        if (this.props.currentVacancies > 0) {
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
    
    const backgroundAudio = <Audio id="background-audio" audioSrc={audioSrc} hidden="true" autoplay="true" loop="true" />;
    return (
      <Background id="waiting" imgSrc={backgroundImgSrc}>
        {backgroundAudio}
        <div className="hotspots">
          {enterMessage}
        </div>
      </Background>
    );
  }

}

export default WaitingRoom;