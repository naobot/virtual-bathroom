import React, { PureComponent } from 'react';
import Button from './Button';

export default class Stall extends PureComponent {
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
    const stallId = `stall-${this.props.direction}`;
    return (     
      <div id={stallId} className="view layer" data-depth="0.2">
        <div className="content">
          <h2>Stall: {this.props.direction}</h2>
          {this.props.children}
        </div>
      </div>
    );
  }

}
