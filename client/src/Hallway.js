import { PureComponent } from 'react';
import Background from './Background';
import Button from './Button';
import enterButton from './assets/actions/perspective-round-arrow-up.png';
// import audioGuideButton from './assets/actions/2_audio-guide.png';
import backgroundImgSrc from './assets/images/bg-hallway.jpg';
import visit1 from './assets/sounds/visit-1.mp3';
import visit2 from './assets/sounds/visit-2.mp3';
import visit3 from './assets/sounds/visit-3.mp3';

const AUDIO_FILES = [visit1, visit2, visit3];
const STORAGE_KEY = 'vb-audio-visit-count';

class Hallway extends PureComponent {
  constructor(props) {
    super(props);
    this.handleEnterBathroomClick = this.handleEnterBathroomClick.bind(this);
    this.handleAudioDescriptionClick = this.handleAudioDescriptionClick.bind(this);
    this.currentAudio = null;
    this.state = {
      isPlaying: false,
    };
  }

  handleEnterBathroomClick(e) {
    if (this.state.isPlaying) return;
    this.props.onEnterBathroom(e);
  }

  handleAudioDescriptionClick(e) {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    const index = count % AUDIO_FILES.length;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(AUDIO_FILES[index]);
    this.currentAudio.play();
    this.setState({ isPlaying: true });

    this.currentAudio.addEventListener('ended', () => {
      this.setState({ isPlaying: false });
    });

    localStorage.setItem(STORAGE_KEY, count + 1);
  }

  render() {
    const { isPlaying } = this.state;
    return (
      <Background id="hallway" imgSrc={backgroundImgSrc}>
        <div className="hotspots layer" data-depth="0.1">
          <Button
            onClick={this.handleEnterBathroomClick}
            altText="Enter Bathroom"
            imgSrc={enterButton}
            top="75vh"
            left="51vw"
            width="9vw"
            className={`arrow--enter-bathroom${isPlaying ? '' : ' blue-glow'}`}
            disabled={isPlaying}
          />
          {/*<Button onClick={this.handleAudioDescriptionClick} noAnimate={true} altText="Audio Guide" imgSrc={audioGuideButton} width="200px" top="93vh" left="12vw" />*/}
        </div>
      </Background>
    );
  }
}

export default Hallway;