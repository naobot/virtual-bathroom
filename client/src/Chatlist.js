import React, { Component } from 'react';

export default class Chatlist extends Component {
  constructor(props) {
    super(props);
    this.stallMap = props.stallMap;
    this.myHex = props.myHex;
    this.getColorStyle = this.getColorStyle.bind(this);
  }

  getColorStyle(hex) {
    return { color: hex }
  }

  render() {
    const chats = this.props.chats.map(chat => 
      <div key={chat.id} className="row show-grid">
        <div className="col-xs-12">
          <div className={chat.userhex === this.myHex ? 'chatMessage self' : 'chatMessage' }>
            <div className="box">
              <p className="user">
                <strong style={this.getColorStyle(chat.userhex)}>{ chat.userhex === this.myHex ? 'you' : chat.userName }</strong>
              </p>
              <p className="message">{chat.message}</p>
            </div>
          </div>
          </div>
        </div>
      );

    console.log(this.props.chats);
    return (
      <div id="chatlist">
        <ul>
          {chats}
        </ul>
      </div>
    );
  }

}
