import React, { PureComponent } from 'react';
// import Button from './Button';
import Parallax from 'parallax-js';
import bigPhoneImg from './assets/images/closeup-note.png';

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
        <img className="phone-img" src={bigPhoneImg} />
      </div>
    );
  }

}
