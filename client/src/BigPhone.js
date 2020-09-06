import React, { PureComponent } from 'react';
// import Button from './Button';
import Parallax from 'parallax-js';

import * as constants from './constants';

export default class BigPhone extends PureComponent {
  constructor(props) { 
    super(props);
    this.conversation = constants.CONVOS[Math.floor(Math.random() * Math.floor(constants.CONVOS.length))];
    this.loadConversation = this.loadConversation.bind(this);
    this.loadMessage = this.loadMessage.bind(this);
  }

  componentDidMount() {
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
    return (
      <div id="big-phone" className={this.props.className} data-depth={this.props.dataDepth} onClick={this.props.handleClick}>
        <div className="phone-convo">
          {convoMsgs}
        </div>
      </div>
    );
  }

}
