import React, { PureComponent } from 'react';
import BigNote from './BigNote';
import Parallax from 'parallax-js';

import * as constants from './constants';

export default class Note extends PureComponent {
  constructor(props) {
    super(props);
    this.classes = "bg-layer";
    this.handleClick = this.handleClick.bind(this);
    this.noteVibe = null;
    this.state = { showNote: false, };
  }

  componentDidMount() {
    this.noteVibe = setInterval(() => {
      constants.animate('#note-layer', 'pulse');
    }, 3.5 * 1000);
  }

  componentDidUpdate() {
    constants.restartParallax('.layer');
    if (!this.state.showNote) {
      constants.animate('#big-note', 'fadeInUp');
    }
    else {
      this.noteVibe = setInterval(() => {
        constants.animate('#note-layer', 'pulse');
      }, 3.5 * 1000);
    }
  }

  componentWillUnmount() {
    // console.log('unmounting Note.js');
    clearInterval(this.noteVibe);
  }

  handleClick() {
    console.log('toggling note');
    clearInterval(this.noteVibe);
    this.setState({ showNote: !this.state.showNote });
  }

  render() {
    var zoomOutNote = <div id="note-layer" className={this.classes} onClick={this.handleClick}></div>;
    var zoomInNote =
      <BigNote onClick={this.handleClick} className="bg-layer" dataDepth="0.3"/>;
    if (this.state.showNote) {
      zoomOutNote = <div id="note-layer" className='hide' onClick={this.handleClick}></div>;
    }
    else {
      zoomInNote =
        <BigNote className="hide" onClick={this.handleClick} />;
    }
    return (
      <>
        {zoomInNote}
        {zoomOutNote}
      </>
    );
  }

}