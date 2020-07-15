import React, { PureComponent } from 'react';
import Button from './Button';

export default class StallLeft extends PureComponent {
  constructor(props) {
    super(props);
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  // componentDidMount() {
  //   console.log(`waiting room mounted`);
  // }

  handleNavigationClick(target) {
    this.props.handleNavigationClick(target);
  }

  render() {
    return (
      <div id="stall-front" className="component-box">
        <h2>Stall: Left</h2>
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
