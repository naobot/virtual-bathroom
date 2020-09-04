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
      if (this.props.queuePosition > 0) {
        enterMessage = <div className="please-wait neon" style={positioningCss}>PLEASE WAIT...<br/>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.queuePosition} / {this.props.inLineTotal}</div>;
      }
      else { // == 0
        enterMessage = <>
            <Audio id="enter-sound" audioSrc={vacancyAudioSrc} hidden="true" autoplay="true" />
            <Button className="arrow--enter-stall blue-glow" onClick={this.handleEnterRoomClick} altText="Enter Stall" imgSrc={enterStallButton} top={positioningCss.top} left={positioningCss.left}  />
          </>;
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