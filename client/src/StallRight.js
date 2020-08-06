import React, { PureComponent } from 'react';
import Button from './Button';
import Chatbox from './Chatbox';

export default class RoomRight extends PureComponent {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.userHex = props.userHex;
    this.myId = props.myId;
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  handleNavigationClick(target) {
    this.props.handleNavigationClick(target);
  }

  render() {
    return (
      <div id="stall-right" className="view layer">
        <div className="content">
          <h2>Stall: Right</h2>
          <Button onClick={() => this.handleNavigationClick('stall-front')} buttonText="Front" /><br />
          <Button onClick={() => this.handleNavigationClick('stall-up')} buttonText="Up" /><br />
          <Button onClick={() => this.handleNavigationClick('stall-left')} buttonText="Left" />
          <Button onClick={() => this.handleNavigationClick('stall-right')} buttonText="Right" /><br />
          <Button onClick={() => this.handleNavigationClick('stall-down')} buttonText="Down" /><br />
          <Button onClick={() => this.handleNavigationClick('stall-back')} buttonText="Back" /><br />
          <Chatbox userHex={this.userHex} occupantsByStall={this.props.occupantsByStall} channel={this.channel} myId={this.myId} />
        </div>
      </div>
    );
  }

}
