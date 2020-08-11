import React, { PureComponent } from 'react';

class Button extends PureComponent {
  render() {
    const { top, left, width } = this.props;
    const style = {
      position: 'relative',
      top: top,
      left: left,
      width: width,
    }
    return (
      <img className="nav-image animate__animated animate__infinite animate__slower animate__pulse" src={this.props.imgSrc} onClick={this.props.onClick} text={this.props.altText} style={style} />
    );
  }

}

export default Button;