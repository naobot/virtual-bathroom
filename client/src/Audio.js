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
    return (
      <div>
        <audio className="audio">
          <source src={this.props.audioSrc}></source>
        </audio>
      </div>
    );
  }

}

export default Audio;