import React, { PureComponent } from 'react';

export default class Hotspots extends PureComponent {
  constructor(props) { 
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="hotspots layer" data-depth="0.1">{this.props.children}</div>
    );
  }

}


