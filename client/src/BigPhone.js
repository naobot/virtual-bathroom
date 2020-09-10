import React, { PureComponent } from 'react';
// import Button from './Button';
import Parallax from 'parallax-js';
import bigPhoneImg from './assets/images/closeup-phone.png';

import * as constants from './constants';

export default class BigPhone extends PureComponent {
  constructor(props) { 
    super(props);
    this.conversation = constants.CONVOS[Math.floor(Math.random() * Math.floor(constants.CONVOS.length))];
    this.handleTextChange = this.handleTextChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      text: '',
      sentMessages: [],
    }
  }

  componentDidMount() {
    constants.scrollToBottom(this.messagesEnd);
  }

  componentDidUpdate() {
    constants.scrollToBottom(this.messagesEnd);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) { // hit enter on keyboard
      this.sendMessage();   
    }
    else {
      this.setState({ text: e.target.value });
    }
  }

  sendMessage() {
    if (this.state.text !== '') {
      let newMessages = Array.from(this.state.sentMessages);
      newMessages.push(this.state.text);
      this.setState((prevState) => {
        return { 
          ...prevState, sentMessages: newMessages, text: '', 
        }
      }, () => { 
        constants.scrollToBottom(this.messagesEnd);
      });
    }   
  }

  render() {
    let convoMsgs = this.conversation.map(messageItem => 
      <div className={messageItem.from === 'Me' ? 'phone-msg self' : 'phone-msg'}>
        <div className="user">
          <strong className={messageItem.from === 'Me' ? 'hide' : ''}>{messageItem.from}</strong>
          <span className="time">{messageItem.time}</span>
        </div>
        <div className="box">
          <p className="message">
            {messageItem.message}
          </p>
        </div>
      </div>
      );
    let sent = null;
    if (this.state.sentMessages.length > 0) {
      sent = this.state.sentMessages.map((sentMessage) =>  
        <div className="phone-msg self">
          <div className="user">
            <strong className="hide">Me</strong>
            <span className="time">just now</span>
          </div>
          <div className="box">
            <p className="message">
              {sentMessage}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div id="big-phone" className={this.props.className} data-depth={this.props.dataDepth} onClick={this.props.onClick}>
        <img className="phone-img" src={bigPhoneImg} />
        <div className="phone-convo">
          <div className="phone-messages">
            {convoMsgs}
            {sent}
            <div className="phone-messages-bottom" style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
        <div className="enter-message" onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();}}>
          <input
            type="text"
            value={this.state.text}
            placeholder=""
            onChange={this.handleTextChange}
            onKeyDown={this.handleTextChange}
            />
          <div className="send-button" onClick={this.sendMessage}></div>
        </div>
        </div>
      </div>
    );
  }

}
