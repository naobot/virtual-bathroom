import React, { PureComponent } from 'react';

class Background extends PureComponent {
  render() {
    const style = {
      backgroundImage: `url('${this.props.imgSrc}')`
    }

    return (
      <div className="view layer" data-depth="0.1">
        <div id={this.props.id} className="content" style={style}>
          {this.props.children}
        </div>
      </div>
    );

  }
}

export default Background;