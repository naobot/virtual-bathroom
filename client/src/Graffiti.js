import React, { PureComponent } from 'react';
import Button from './Button';

import * as constants from './constants';

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

export default class Graffiti extends PureComponent {
  constructor(props) { 
    super(props);
    this.painting = false;
    this.position = { x: 0, y: 0 };
    this.canvas = null;
    this.noteImg = null;
    this.ctx = null;
    this.newGraffiti = this.newGraffiti.bind(this);
    this._downHandler = this._downHandler.bind(this);
    this._upHandler = this._upHandler.bind(this);
    this._moveHandler = this._moveHandler.bind(this);
    this._getPosition = this._getPosition.bind(this);
    this._resizeCanvas = this._resizeCanvas.bind(this);
    this._isCanvasBlank = this._isCanvasBlank.bind(this);
    this.state = {
      noteImg: null,
      loaded: false,
      loadedCanvas: null,
      newGraffiti: false,
    }
  }

  componentDidMount() {
    this.canvas = document.getElementById(this.props.id);

    console.log(this.canvas);
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');

      this.canvas.addEventListener('mousedown', this._downHandler);
      this.canvas.addEventListener('mousemove', this._moveHandler);
      this.canvas.addEventListener('mouseup', this._upHandler);
    }

    window.addEventListener('resize', this._resizeCanvas);

    var loadedCanvas;
    axios.get(`${ENDPOINT}graffiti`)
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          loadedCanvas = res.data[Math.floor(Math.random() * res.data.length)].canvasImage;
          this.setState({ 
            noteImg: document.querySelector('img.note-img'), 
            loaded: true, 
            loadedCanvas: loadedCanvas,
          }, () => {this._resizeCanvas();});
        }
      })
      .catch((err) => { 
        console.log(err); 
      });
  }

  componentDidUpdate() {
    this._resizeCanvas();
  }

  componentWillUnmount() {
    console.log('unmounting canvas');
    if (this._isCanvasBlank(this.canvas)) {
      var canvasImage = this.canvas.toDataURL();

      axios.post(`${ENDPOINT}draw`, {
        canvasImage: canvasImage,
      })
      .then((res) => {
        console.log('/draw: OK');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  _resizeCanvas() {
    if (this.canvas && this.state.noteImg) {
      var size = { width: this.state.noteImg.width * 0.8 , height: this.state.noteImg.height * 0.9 }
      this.canvas.setAttribute('width', size.width );
      this.canvas.setAttribute('height', size.height );
      let loadedGraffiti = document.querySelector('img.loaded-graffiti');
      console.log(loadedGraffiti);
      if (loadedGraffiti) {
        loadedGraffiti.style.cssText = `width:${size.width}px;height:${size.height}px`;
      }
    }
  }

  _getPosition(e) {
    if (this.canvas) {
      var rect = this.canvas.getBoundingClientRect();

      if (e.originalEvent) {
        e = e.originalEvent;
      }

      this.position.x = e.clientX - rect.left;
      this.position.y = e.clientY - rect.top;
    }
  }

  _downHandler(e) {
    this.painting = true;
    this._getPosition(e);
    e.preventDefault();
  }

  _upHandler(e) {
    this.painting = false;
    e.preventDefault();
  }

  _moveHandler(e) {
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
      this._getPosition(e); 
       
      // A line is traced from start 
      // coordinate to this coordinate 
      this.ctx.lineTo(this.position.x , this.position.y); 
        
      // Draws the line. 
      this.ctx.stroke(); 
    }
  }

  _isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    return !pixelBuffer.some(color => color !== 0);
  }

  newGraffiti(e) {
    e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();
    this.setState({ newGraffiti: true, }, () => { this._resizeCanvas(); });
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
