import React, { PureComponent } from 'react';
import Background from './Background';
import Button from './Button';
import enterButton from './assets/actions/perspective-round-arrow-up.png';
import audioGuideButton from './assets/actions/2_audio-guide.png';
import backgroundImgSrc from './assets/images/bg-hallway.jpg';

class Hallway extends PureComponent {
  constructor(props) {
    super(props);
    this.handleEnterBathroomClick = this.handleEnterBathroomClick.bind(this);
    this.handleAudioDescriptionClick = this.handleAudioDescriptionClick.bind(this);
  }

  handleEnterBathroomClick(e) {
    this.props.onEnterBathroom(e);
  }

  handleAudioDescriptionClick(e) {
    alert('sorry! not yet implemented T__T');
  }

  render() {
    return (
      <Background id="hallway" imgSrc={backgroundImgSrc}>
        <div className="hotspots layer" data-depth="0.1">
          <Button onClick={this.handleEnterBathroomClick} altText="Enter Bathroom" imgSrc={enterButton} top="75vh" left="51vw" width="9vw" className="arrow--enter-bathroom blue-glow" />
          <Button onClick={this.handleAudioDescriptionClick} noAnimate={true} altText="Audio Guide" imgSrc={audioGuideButton} width="200px" top="93vh" left="12vw" />
        </div>
      </Background>
    );
  }

}

export default Hallway;