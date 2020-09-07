import React, { PureComponent } from 'react';
import BigPhone from './BigPhone';
import Parallax from 'parallax-js';


export default class Phone extends PureComponent {
  constructor(props) { 
    super(props);
    this.classes = "bg-layer";
    this.animatePhone = this.animatePhone.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.phoneVibe = null;
    this.state = { showPhone: false, };
    this.restartParallax = this.restartParallax.bind(this);
  }

  componentDidMount() {
    this.phoneVibe = setInterval(() => {
      this.animatePhone('#phone-layer', 'shakeX');
    }, 3.5 * 1000);
  }

  componentDidUpdate() {
    this.restartParallax();
    if (this.state.showPhone) {
      this.animatePhone('#big-phone', 'rotateInUpLeft');
    }
    else {
      this.phoneVibe = setInterval(() => {
        this.animatePhone('#phone-layer', 'shakeX');
      }, 3.5 * 1000);
    }
  }

  componentWillUnmount() {
    // console.log('unmounting Phone.js');
    clearInterval(this.phoneVibe);
  }

  animatePhone(element, animationName) {
    new Promise((resolve, reject) => {
      const node = document.querySelector(element);
      node.classList.add('animate__animated', `animate__${animationName}`);

      function handleAnimationEnd() {
        node.classList.remove('animate__animated', `animate__${animationName}`);
        node.removeEventListener('animationend', handleAnimationEnd);

        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd);
    })
  }

  handleClick() {
    console.log('toggling phone');
    clearInterval(this.phoneVibe);
    this.setState({ showPhone: !this.state.showPhone });
  }

  restartParallax() {
    var container = document.getElementById('app');
    var parallaxInstance = new Parallax(container, {
      selector: '.layer',
      pointerEvents: true,
    });
  }

  render() {
    var zoomOutPhone = <div id="phone-layer" className={this.classes} onClick={this.handleClick}></div>;
    var zoomInPhone = 
      <BigPhone onClick={this.handleClick} className="bg-layer layer" dataDepth="0.3" onClick={this.handleClick} />;
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
