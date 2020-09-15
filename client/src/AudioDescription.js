import React, { PureComponent } from 'react';
import Audio from './Audio';

import * as constants from './constants';

class AudioDescription extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    const audioSrcs = [
      `${constants.STATICURL}/First_Visit_-_Make_Believe_Bathroom_FINAL.mp3`,
      `${constants.STATICURL}/Second_Visit_-_Make_Believe_Bathroom_FINAL.mp3`,
      `${constants.STATICURL}/Third_Visit_-_Make_Believe_Bathroom_FINAL.mp3`,
    ];
    return (
      <div className="alert-container">
        <div id="audio-description-container" className="alert">
          <div className="alert-msg">
            <h1>Make-Believe Bathroom</h1>
            <h2>Audio Description</h2>
            <p>The following three audio description tracks describe possible visitor experiences of the Make-Believe Bathroom. Listening to all three visits in sequence is recommended.</p>
            <dl>
              <dt>First visit:</dt>
              <dd><Audio id="audio-desc-1" audioSrc={audioSrcs[0]} controls={true} /></dd>
            </dl>
            <dl>
              <dt>Second visit:</dt>
              <dd><Audio id="audio-desc-2" audioSrc={audioSrcs[1]} controls={true} /></dd>
            </dl>
            <dl>
              <dt>Third visit:</dt>
              <dd><Audio id="audio-desc-3" audioSrc={audioSrcs[2]} controls={true} /></dd>
            </dl>
          </div>
          <div className="alert-buttons">
            <div className="alert-button" onClick={this.props.closeAudioDescription}>Close</div>
          </div>
        </div>
      </div>
    );
  }

}

export default AudioDescription;