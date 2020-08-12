import React, { Component } from 'react';
import Button from './Button';

class Mirrors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'bathroom',
    }
    // this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  // handleNavigationClick(target) {
  //   if (target === 'waiting') {
  //     this.props.onEnterWaiting();
  //   }
  //   else if (target === 'bathroom') {
  //     this.setState({ currentView: 'bathroom' });
  //   }
  // }

  render() {
    var currentView = null;
    // if (this.state.currentView === 'bathroom') {
    //   currentView = 
    //     <div>
    //       <Button onClick={() => this.handleNavigationClick('waiting')} buttonText="Wait for Stall" />
    //     </div>;
    // }

    return (
      <div id={this.state.currentView} className="view layer" data-depth="0.2">
        <div className="content">
          <h2>{this.state.currentView}</h2>
          {currentView}
        </div>
      </div>
    );
  }

}

export default Mirrors;