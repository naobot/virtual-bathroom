import React, { PureComponent } from 'react';
import Button from './Button';

import * as constants from './constants';

// import FormData from 'form-data';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

var ENDPOINT;
if (process.env.NODE_ENV === 'development' ) {
  ENDPOINT = 'http://localhost:5000/'
}
else {
  ENDPOINT = 'https://virtual-bathroom.herokuapp.com/'
}

const getSignedURL = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(ENDPOINT + "get-signed-url")
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default class Graffiti extends PureComponent {
  constructor(props) { 
    super(props);
    this.painting = false;
    this.position = { x: 0, y: 0 };
    this.canvas = null;
    this.noteImg = null;
    this.ctx = null;
    this.newGraffiti = this.newGraffiti.bind(this);
    this.downHandler = this.downHandler.bind(this);
    this.upHandler = this.upHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.isCanvasBlank = this.isCanvasBlank.bind(this);
    this.state = {
      noteImg: null,
      loaded: false,
      loadedCanvas: null,
      newGraffiti: false,
    }
  }

  componentDidMount() {
    this.canvas = document.getElementById(this.props.id);

    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');

      this.canvas.addEventListener('mousedown', this.downHandler);
      this.canvas.addEventListener('mousemove', this.moveHandler);
      this.canvas.addEventListener('mouseup', this.upHandler);
    }

    window.addEventListener('resize', this.resizeCanvas);
  }

  componentDidUpdate() {
    this.resizeCanvas();
  }

  componentWillUnmount() {
    console.log('unmounting canvas');
    if (!this.isCanvasBlank(this.canvas)) {
      const config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
        }
      };

      var form = new FormData();
      var blob = this.canvas.toBlob(() => {
        form.append('file', blob);
        getSignedURL().then(data => {
          console.log(data);
          axios
          .put(data.data.urls[0], form, config)
          .then((res) => {
            console.log(`Upload Completed:`);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        });
      });
    }
  }

  resizeCanvas() {
    if (this.canvas && this.state.noteImg) {
      var size = { width: this.state.noteImg.width * 0.8 , height: this.state.noteImg.height * 0.9 }
      this.canvas.setAttribute('width', size.width );
      this.canvas.setAttribute('height', size.height );
      let loadedGraffiti = document.querySelector('img.loaded-graffiti');
      if (loadedGraffiti) {
        loadedGraffiti.style.cssText = `width:${size.width}px;height:${size.height}px`;
      }
    }
  }

  getPosition(e) {
    if (this.canvas) {
      var rect = this.canvas.getBoundingClientRect();

      if (e.originalEvent) {
        e = e.originalEvent;
      }

      this.position.x = e.clientX - rect.left;
      this.position.y = e.clientY - rect.top;
    }
  }

  downHandler(e) {
    this.painting = true;
    this.getPosition(e);
    e.preventDefault();
  }

  upHandler(e) {
    this.painting = false;
    e.preventDefault();
  }

  moveHandler(e) {
    if (this.painting && this.ctx) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      // Sets the end of the lines drawn 
      // to a round shape. 
      this.ctx.lineCap = 'round'; 
        
      this.ctx.strokeStyle = `rgba(0,0,0,${Math.random()*0.2+0.4})`; 
          
      // The cursor to start drawing 
      // moves to this coordinate 
      this.ctx.moveTo(this.position.x, this.position.y); 
       
      // The position of the cursor 
      // gets updated as we move the 
      // mouse around. 
      this.getPosition(e); 
       
      // A line is traced from start 
      // coordinate to this coordinate 
      this.ctx.lineTo(this.position.x , this.position.y); 
        
      // Draws the line. 
      this.ctx.stroke(); 
    }
  }

  isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    return !pixelBuffer.some(color => color !== 0);
  }

  newGraffiti(e) {
    e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();
    this.setState({ newGraffiti: true, }, () => { this.resizeCanvas(); });
  }

  render() {
    var loadedCanvasImage;
    if (this.state.loadedCanvas) {
      loadedCanvasImage = <img className={this.state.newGraffiti ? 'loaded-graffiti hide' : 'loaded-graffiti'} src={this.state.loadedCanvas} />;
    }
    return (
      <>
      {loadedCanvasImage}
      <canvas id={this.props.id} className={this.props.className} onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();}}>
      </canvas>
      <Button className="new-graffiti" onClick={this.newGraffiti}>
        leave new graffiti
      </Button>
      </>
    );
  }

}
