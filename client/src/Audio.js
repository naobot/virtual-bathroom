import React, { PureComponent } from 'react';

class Audio extends PureComponent {
  componentDidMount() {
    if (this.props.autoplay) {
      const audioElement = document.getElementsByClassName("audio")[0];
      audioElement.play();
    }
  }
  render() {
    const { autoplay } = this.props;
    var style = {};
    if (this.props.hidden) {
      style = {
        display: 'none',
      }
    }
    return (
      <audio id={this.props.id} className="audio" style={style}>
        <source src={this.props.audioSrc}></source>
      </audio>
    );
  }

}

export default Audio;