import React, { Component } from 'react';
import Chatlist from './Chatlist';
import Audio from './Audio';
import notificationSound from './assets/sounds/clearly.mp3';
import axios from 'axios';
import dotenv from 'dotenv';

import * as constants from './constants';

dotenv.config({ path: '.env' });

export default class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.myId = props.channel.members.me.id;
    this.userHex = props.userHex;
    this.userName = props.userName;
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

  componentDidUpdate() {
    constants.scrollToBottom(this.messagesEnd);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) { // hit enter on keyboard
      const payload = {
        channel_name: this.channel.name,
        userId: this.myId,
        userName: this.userName,
        userhex: this.userHex,
        message: this.state.text,
      };
      var ENDPOINT;
      if (process.env.NODE_ENV === 'development' ) {
        ENDPOINT = 'http://localhost:5000/'
      }
      else {
        ENDPOINT = 'https://virtual-bathroom.herokuapp.com/'
      }
      axios.post(ENDPOINT + 'message', payload);
      this.setState({ text: '' });
      constants.scrollToBottom(this.messagesEnd);
    }
    else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div id="chatbox" className="component-box">
        <Audio id="notification-sound" audioSrc={notificationSound} hidden="true" />
        <div className="chatlist-container">
          <Chatlist chats={this.state.chats} myHex={this.userHex} />
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
