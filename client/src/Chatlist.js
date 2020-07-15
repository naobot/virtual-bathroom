import React, { Component } from 'react';

export default class Chatlist extends Component {
  constructor(props) {
    super(props);
    this.getColorStyle = this.getColorStyle.bind(this);
  }

  getColorStyle(hex) {
    return { color: hex }
  }

  render() {
    const chats = this.props.chats.map(chat => 
      <div>
        <div className="row show-grid">
          <div className="col-xs-12">
            
            <div className="chatMessage">
              <div key={chat.id} className="box">
                <p>
                  <strong style={this.getColorStyle(chat.userhex)}>someone</strong>
                </p>
                <p>{chat.message}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      );


    return (
      <div id="chatlist">
        <ul>
          {chats}
        </ul>
      </div>
    );
  }

}
