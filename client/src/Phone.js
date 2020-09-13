import React, { PureComponent } from 'react';
import BigPhone from './BigPhone';
import Parallax from 'parallax-js';

import * as constants from './constants';

export default class Phone extends PureComponent {
  constructor(props) { 
    super(props);
    this.classes = "bg-layer";
    this.handleClick = this.handleClick.bind(this);
    this.phoneVibe = null;
    this.state = { showPhone: false, };
  }

  componentDidMount() {
    this.phoneVibe = setInterval(() => {
      constants.animate('#phone-layer', 'shakeX');
    }, 3.5 * 1000);
  }

  componentDidUpdate() {
    constants.restartParallax('.layer');
    if (this.state.showPhone) {
      constants.animate('#big-phone', 'rotateInUpLeft');
    }
    else {
      this.phoneVibe = setInterval(() => {
        constants.animate('#phone-layer', 'shakeX');
      }, 3.5 * 1000);
    }
  }

  componentWillUnmount() {
    // console.log('unmounting Phone.js');
    clearInterval(this.phoneVibe);
  }

  handleClick() {
    console.log('toggling phone');
    var phoneBottom = document.getElementsByClassName("phone-messages-bottom")[0];
    clearInterval(this.phoneVibe);
    this.setState({ showPhone: !this.state.showPhone }, () => {constants.scrollToBottom(phoneBottom)});
  }

  render() {
    var zoomOutPhone = <div id="phone-layer" className={this.classes} onClick={this.handleClick}></div>;
    var zoomInPhone = 
      <BigPhone onClick={this.handleClick} className="bg-layer layer" dataDepth="0.3"/>;
    if (this.state.showPhone) {
      zoomOutPhone = <div id="phone-layer" className='hide' onClick={this.handleClick}></div>;
    }
    else {
      zoomInPhone = 
        <BigPhone className="hide" onClick={this.handleClick} />;
    }
    return (
      <>
        {zoomInPhone}
        {zoomOutPhone}
      </>
    );
  }

}
