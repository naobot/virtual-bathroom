import React, { PureComponent } from 'react';
import Button from './Button';

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
      <div id="hallway" className="view">
        <h2>Hallway</h2>
        <div className="hotspots">
          <Button onClick={this.handleEnterBathroomClick} buttonText="Enter Bathroom" />
        </div>
      </div>
    );
  }

}

export default Hallway;