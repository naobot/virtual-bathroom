import React, { Component } from 'react';
import Chatlist from './Chatlist';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.userHex = props.userHex;
    this.handleTextChange = this.handleTextChange.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleTextChange(e) {
    if (e.keyCode === 13) { // hit enter on keyboard
      const payload = {
        channel_name: this.channel.name,
        userhex: this.userHex,
        message: this.state.text,
      };
      // TODO: must change on deployment...
      var ENDPOINT;
      if (process.env.NODE_ENV === 'development' ) {
        ENDPOINT = 'http://localhost:5000/'
      }
      else {
        ENDPOINT = 'https://virtual-bathroom.herokuapp.com/'
      }
      axios.post(ENDPOINT + 'message', payload);
      this.setState({ text: '' });
      this.scrollToBottom();
    }
    else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div id="chatbox" className="component-box">
        <h2>Chatbox</h2>
        <div className="chatlist-container">
          <Chatlist chats={this.state.chats} />
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
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
