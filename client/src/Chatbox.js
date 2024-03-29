import React, { Component } from 'react';
import Chatlist from './Chatlist';
import axios from 'axios';

export default class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.userHex = props.userHex;
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      text: '',
      chats: [],
    }
  }

  componentDidMount() {
    this.channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });
  }

  handleTextChange(e) {
    if (e.keyCode === 13) { // hit enter on keyboard
      const payload = {
        channel_name: this.channel.name,
        userhex: this.userHex,
        message: this.state.text,
      };
      axios.post('http://localhost:5000/message', payload);
      this.setState({ text: '' });
    }
    else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div id="chatbox" className="component-box">
        <h2>Chatbox</h2>
        <Chatlist chats={this.state.chats} />
        <input
          type="text"
          value={this.state.text}
          placeholder="chat here..."
          onChange={this.handleTextChange}
          onKeyDown={this.handleTextChange}
          />
      </div>
    );
  }

}
