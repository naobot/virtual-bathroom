import React, { PureComponent } from 'react';

class Background extends PureComponent {
  render() {
    const style = {
      backgroundImage: `url('${this.props.imgSrc}')`
    }
    var responsive = this.props.reponsive ? 'bg-div--responsive' : 'bg-div';
    const classes = `content ${responsive}`;
    return (
      <div className="view layer" data-depth="0.1">
        <div id={this.props.id} className={classes} style={style}>
          {this.props.children}
        </div>
      </div>
    );

  }
}

export default Background;