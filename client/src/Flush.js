import React, { PureComponent } from 'react';
import Button from './Button';
import * as constants from './constants';

class Flush extends PureComponent {
  constructor(props) {
    super(props);
    this.classes = "flush-button neon";
    this.handleClick = this.handleClick.bind(this);
    this.phoneVibe = null;
    this.state = { flushed: false, };
  }

  handleClick() {
    console.log('flushing');
    const audioElement = document.getElementById("flush-audio");
    if (audioElement) {
      audioElement.play();
    }
    if (!this.state.flushed) {
      this.setState({ flushed: true }, () => {
        constants.animate('#flushed', 'fadeIn');
      });
    }
  }

  render() {
    const flushButton = <Button onClick={this.handleClick} className="flush-button neon blueglow">Flush</Button>;
    const flushedBg = this.state.flushed? <div id="flushed" className="bg-layer"></div> : <div id="flushed" className="bg-layer hide" ></div>;

    return (
      <>
      {flushButton}
      {flushedBg}
      </>
    )
  }
}

export default Flush;