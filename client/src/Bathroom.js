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
    else if (target === 'mirrors') {
      this.setState({ currentView: 'mirrors' });
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
          <Button onClick={() => this.handleNavigationClick('mirrors')} buttonText="Go to Mirrors" />
        </div>;
    }
    else if (this.state.currentView === 'mirrors') {
      currentView = 
        <div id="mirrors">
          <Button onClick={() => this.handleNavigationClick('bathroom')} buttonText="Back" />
        </div>
    }

    return (
      <div id="bathroom" className="view">
        <div>
          <h2>Bathroom</h2>
        </div>
        {currentView}
      </div>
    );
  }

}

export default Bathroom;