import React, { PureComponent } from 'react';
import Background from './Background';
import Button from './Button';
import * as constants from './constants';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const enterButton = `${constants.STATICURL}/actions/perspective-round-arrow-up.png`;
const audioGuideButton = `${constants.STATICURL}/actions/2_audio-guide.png`;
const backgroundImgSrc = `${constants.STATICURL}/images/bg-hallway.jpg`;

class Hallway extends PureComponent {
  constructor(props) {
    super(props);
    this.handleEnterBathroomClick = this.handleEnterBathroomClick.bind(this);
    this.handleEnterBathroomKeyDown = this.handleEnterBathroomKeyDown.bind(this);
  }

  componentDidMount() {
    const audioButton = document.getElementById('audio-guide');
    audioButton.addEventListener('keydown', this.handleEnterBathroomKeyDown);
  }

  handleEnterBathroomKeyDown(e) {
    if (e.which === 13 || e.which === 32) {
      this.props.openAudioDescription(e);
    }
  }

  handleEnterBathroomClick(e) {
    this.props.onEnterBathroom(e);
  }

  render() {
    return (
      <Background id="hallway" imgSrc={backgroundImgSrc}>
        <div className="hotspots layer" data-depth="0.1">
          <Button onClick={this.handleEnterBathroomClick} altText="Enter Bathroom" imgSrc={enterButton} top="75vh" left="51vw" width="9vw" className="arrow--enter-bathroom blue-glow" />
          <Button id="audio-guide" tabindex="0" onClick={this.props.openAudioDescription} noAnimate={true} altText="Audio Guide" imgSrc={audioGuideButton} width="280px" top="13vh" left="12vw" />
        </div>
      </Background>
    );
  }

}

export default Hallway;