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
    var className = this.props.className + " nav-image";
    if (!this.props.noAnimate) {
      className += " animate__animated animate__infinite animate__slower animate__pulse"
    }
    if (this.props.imgSrc) {
      return (
        <img className={className} src={this.props.imgSrc} onClick={this.props.onClick} text={this.props.altText} style={style} />
      );
    }
    else {
      return (
        <div className={className} onClick={this.props.onClick} style={style}>{this.props.children}</div>
      );
    }
  }

}

export default Button;