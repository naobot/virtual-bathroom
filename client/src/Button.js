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
    var className = this.props.className || "";
    className += " nav-image";
    if (!this.props.noAnimate && this.props.animate === 'pulse') {
      className += " animate__animated animate__infinite animate__slower animate__pulse"
    }
    else if (!this.props.noAnimate && this.props.animate === 'shake') {
      className += " animate__animated animate__infinite animate__delay-3s animate__headShake"
    }
    if (this.props.imgSrc) {
      return (
        <img id={this.props.id} tabindex={this.props.tabindex} className={className} src={this.props.imgSrc} onClick={this.props.onClick} text={this.props.altText} style={style} />
      );
    }
    else {
      return (
        <div id={this.props.id} className={className} onClick={this.props.onClick} style={style}>{this.props.children}</div>
      );
    }
  }

}

export default Button;