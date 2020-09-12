import React, { PureComponent } from 'react';
import loadingImg from './assets/loading.png';

import * as constants from './constants';

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    console.log('Loading complete');
    this.setState({
      loaded: true, // images already rendered in first pass of render()
    });
  }

  componentDidUpdate() {
    if (this.state.loaded) {
      this.props.onLoad();
    }
  }

  render() {
    let images = [];
    if (!this.state.loaded) {
      console.log('Loading...');
      // preload most images
      for (var i = 0; i < constants.IMAGES.length; i++) {
        let imageSrc = constants.IMAGES[i];
        const img = <img src={imageSrc} className='hide' key={i} />;
        images.push(img);
      }
    }
    return (
      <div className="loading">
        <div>
          <img src={loadingImg} className="rotating" />
          {images}
        </div>
      </div>
    );

  }
}

export default Loading;