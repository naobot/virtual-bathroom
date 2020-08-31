import React, { Component } from 'react';
import Button from './Button';

export default class Phone extends Component {
  constructor(props) { 
    super(props);
    this.classes = "bg-layer";
    this.animatePhone = this.animatePhone.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.phoneVibe = null;
  }

  componentDidMount() {
    this.phoneVibe = setInterval(() => {
      this.animatePhone('#phone-layer');
    }, 4.5 * 1000);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    console.log('unmounting Phone.js');
    clearInterval(this.phoneVibe);
  }

  animatePhone(element) {
    new Promise((resolve, reject) => {
      const node = document.querySelector(element);
      node.classList.add('animate__animated', 'animate__delay-1s', 'animate__shakeX');

      function handleAnimationEnd() {
        node.classList.remove('animate__animated', 'animate__delay-1s', 'animate__shakeX');
        node.removeEventListener('animationend', handleAnimationEnd);

        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd);
    })
  }

  handleClick() {
    clearInterval(this.phoneVibe);
    console.log('phone clicked!');
  }

  render() {
    return (
      <div id="phone-layer" className={this.classes} onClick={this.handleClick}>
      </div>
    );
  }

}
