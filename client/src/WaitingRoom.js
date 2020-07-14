import React, { PureComponent } from 'react';
import EnterStall from './EnterStall';

class WaitingRoom extends PureComponent {
  constructor(props) {
    super(props);
    this.handleEnterStallClick = this.handleEnterStallClick.bind(this);
  }

  // componentDidMount() {
  //   console.log(`waiting room mounted`);
  // }

  handleEnterStallClick(e) {
    this.props.onEnterStall(e);
  }

  render() {
    return (
      <div id="waiting" className="component-box">
        <h2>Waiting Room</h2>
        In line: {this.props.inLine}<br/>
        <EnterStall onClick={this.handleEnterStallClick} />
      </div>
    );
  }

}

export default WaitingRoom;