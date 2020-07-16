import React, { PureComponent } from 'react';
import Button from './Button';

export default class RoomUp extends PureComponent {
  constructor(props) {
    super(props);
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  // componentDidMount() {
  //   console.log(`waiting stall mounted`);
  // }

  handleNavigationClick(target) {
    this.props.handleNavigationClick(target);
  }

  render() {
    return (
      <div id="stall-up" className="view">
        <h2>Stall: Up</h2>
        <Button onClick={() => this.handleNavigationClick('stall-front')} buttonText="Front" /><br />
        <Button onClick={() => this.handleNavigationClick('stall-up')} buttonText="Up" /><br />
        <Button onClick={() => this.handleNavigationClick('stall-left')} buttonText="Left" />
        <Button onClick={() => this.handleNavigationClick('stall-right')} buttonText="Right" /><br />
        <Button onClick={() => this.handleNavigationClick('stall-down')} buttonText="Down" /><br />
        <Button onClick={() => this.handleNavigationClick('stall-back')} buttonText="Back" /><br />
      </div>
    );
  }

}
