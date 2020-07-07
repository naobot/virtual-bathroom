import React, { Component } from 'react';

class EnterStall extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button onClick={onClick}>Enter Stall</button>
    );
  }

}

export default EnterStall;