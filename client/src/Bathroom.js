import React, { Component } from 'react';
import Button from './Button';

class Bathroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'bathroom',
    }
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  handleNavigationClick(target) {
    if (target === 'waiting') {
      this.props.onEnterWaiting();
    }
    else if (target === 'bathroom') {
      this.setState({ currentView: 'bathroom' });
    }
  }

  render() {
    var currentView = null;
    if (this.state.currentView === 'bathroom') {
      currentView = 
        <div>
          <Button onClick={() => this.handleNavigationClick('waiting')} buttonText="Wait for Stall" />
        </div>;
    }

    return (
      <div id={this.state.currentView} className="view">
        <div>
          <h2>{this.state.currentView}</h2>
        </div>
        {currentView}
      </div>
    );
  }

}

export default Bathroom;