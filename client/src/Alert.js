import React, { PureComponent } from 'react';

class Alert extends PureComponent {
  constructor(props) {
    super(props);
    this.buttonMsg = props.buttonMsg || 'OK';
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="alert-container">
        <div className="alert">
          <div className="alert-msg">{this.props.children}</div>
          <div className="alert-button" onClick={this.props.onOK}>{this.buttonMsg}</div>
        </div>
      </div>
    );
  }

}

export default Alert;