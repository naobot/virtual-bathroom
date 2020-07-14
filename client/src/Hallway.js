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
      <div id="hallway" className="component-box">
        <h2>Hallway</h2>
        <Button onClick={this.handleEnterBathroomClick} buttonText="Enter Bathroom" />
      </div>
    );
  }

}

export default Hallway;