import React, { PureComponent } from 'react';
import Graffiti from './Graffiti';
import Parallax from 'parallax-js';
import bigNoteImg from './assets/images/closeup-note.png';

import * as constants from './constants';

export default class BigNote extends PureComponent {
  constructor(props) { 
    super(props);
  }

  // componentDidMount() {
  // }

  // componentDidUpdate() {
  // }

  render() {
    return (
      <div id="big-note" className={this.props.className} data-depth={this.props.dataDepth} onClick={this.props.onClick}>
        <Graffiti id="note-canvas" className="note-img" />
        <img className="note-img" src={bigNoteImg} onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();}}/>
      </div>
    );
  }

}
