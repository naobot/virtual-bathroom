import React, { PureComponent } from 'react';
import Button from './Button';
import enterButton from './assets/actions/1_enter-the-bathroom.png';

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
            <Button onClick={this.handleEnterBathroomClick} altText="Enter Bathroom" imgSrc={enterButton} width="300px" top="70%" left="29%" />
          </div>
        </div>
      </div>
    );
  }

}

export default Hallway;