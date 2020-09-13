import React, { PureComponent } from 'react';
import * as constants from './constants';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const loadingImg = `${constants.STATICURL}/loading.png`;

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