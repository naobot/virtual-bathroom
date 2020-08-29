import React, { PureComponent } from 'react';
import Button from './Button';
import enterButton from './assets/actions/perspective-round-arrow-up.png';
// import enterButton from './assets/actions/1_enter-the-bathroom.png';
import audioGuideButton from './assets/actions/2_audio-guide.png';

class Hallway extends PureComponent {
  constructor(props) {
    super(props);
    this.handleEnterBathroomClick = this.handleEnterBathroomClick.bind(this);
  }

  // componentDidMount() {
  //   console.log(`waiting room mounted`);
  // }

  handleEnterBathroomClick(e) {
    this.props.onEnterBathroom(e);
  }

  render() {
    return (
      <div className="view layer" data-depth="0.1">
        <div id="hallway" className="content">
          <div className="hotspots layer" data-depth="0.1">
            <Button onClick={this.handleEnterBathroomClick} altText="Enter Bathroom" imgSrc={enterButton} top="75vh" left="51vw" width="9vw" className="arrow--enter-bathroom blue-glow" />
            <Button noAnimate={true} altText="Audio Guide" imgSrc={audioGuideButton} width="200px" top="93vh" left="12vw" />
          </div>
        </div>
      </div>
    );
  }

}

export default Hallway;