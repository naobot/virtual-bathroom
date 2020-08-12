import React, { PureComponent } from 'react';

class Button extends PureComponent {
  render() {
    const { top, left, width } = this.props;
    const style = {
      position: 'absolute',
      top: top,
      left: left,
      width: width,
    }
    if (this.props.noAnimate) {
      var className = "nav-image"
    }
    else {
      var className = "nav-image animate__animated animate__infinite animate__slower animate__pulse"
    }
    return (
      <img className={className} src={this.props.imgSrc} onClick={this.props.onClick} text={this.props.altText} style={style} />
    );
  }

}

export default Button;