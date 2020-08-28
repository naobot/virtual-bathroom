import React, { Component } from 'react';
import Button from './Button';

export default class Phone extends Component {
  constructor(props) { 
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div id="phone-layer" className="bg-layer">
        <Button
          className="check-phone neon"
          onClick={null}
          >
          check phone
        </Button>
      </div>
    );
  }

}
