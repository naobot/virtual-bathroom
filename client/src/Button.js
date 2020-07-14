import React, { PureComponent } from 'react';

class Button extends PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <button onClick={onClick}>{this.props.buttonText}</button>
    );
  }

}

export default Button;