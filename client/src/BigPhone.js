import React, { PureComponent } from 'react';
// import Button from './Button';
import Parallax from 'parallax-js';
import bigPhoneImg from './assets/images/closeup-phone.png';

import * as constants from './constants';

export default class BigPhone extends PureComponent {
  constructor(props) { 
    super(props);
    this.conversation = constants.CONVOS[Math.floor(Math.random() * Math.floor(constants.CONVOS.length))];
    this.loadConversation = this.loadConversation.bind(this);
    this.loadMessage = this.loadMessage.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      text: '',
      sentMessage: null,
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    constants.scrollToBottom(this.messagesEnd);
  }

  loadConversation(conversation) {
    conversation.forEach(item => this.loadMessage(item));
  }

  loadMessage(messageItem) {
    const element = document.getElementsByClassName("phone-convo")[0];
    const isMe = messageItem.from === 'Me';
    let messageElement =
      <div className="phone-msg">
        <div className="box">
          <p className="time">
            {messageItem.time}
          </p>
          <p className="user">
            <strong>{messageItem.from}</strong>
          </p>
          <p className="message">
            {messageItem.message}
          </p>
        </div>
      </div>;
    this.phoneConvoDiv.push(messageElement);
    constants.scrollToBottom(element);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) { // hit enter on keyboard
      if (this.state.text !== '') {
        this.setState((prevState) => {
          return { 
            ...prevState, sentMessage: prevState.text, text: '' 
          }
        }, () => { 
          constants.scrollToBottom(this.messagesEnd);
        });
      }      
    }
    else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    let convoMsgs = this.conversation.map(messageItem => 
      <div className="phone-msg">
        <div className="box">
          <p className="time">
            {messageItem.time}
          </p>
          <p className="user">
            <strong>{messageItem.from}</strong>
          </p>
          <p className="message">
            {messageItem.message}
          </p>
        </div>
      </div>
      );
    const sent =
      <div className="phone-msg">
        <div className="box">
          <p className="time">
            just now
          </p>
          <p className="user">
            <strong>Me</strong>
          </p>
          <p className="message">
            {this.state.sentMessage}
          </p>
        </div>
      </div>;
    return (
      <div id="big-phone" className={this.props.className} data-depth={this.props.dataDepth} onClick={this.props.handleClick}>
        <img className="phone-img" src={bigPhoneImg} />
        <div className="phone-convo">
          <div className="phone-messages">
            {convoMsgs}
            {sent}
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
      </div>
    );
  }

}
