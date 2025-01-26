import React, { Component } from 'react';
import Pusher from 'pusher-js';
import Loading from './Loading';
import Hallway from './Hallway';
import WaitingRoom from './WaitingRoom';
import Room from './Room';
import Mirrors from './Mirrors';

import './css/animate.min.css';
import './css/normalize.css';
import './css/App.css';

import * as constants from './constants';

const LOGGING = process.env.NODE_ENV === 'development';

class App extends Component {
  constructor(props) {
    super(props);
    this.pusher = new Pusher('93d5b6db6095187f5ef6', {
      cluster: 'us2',
      encrypted: true,
      authEndpoint: `${process.env.REACT_APP_API_URL}/pusher/auth`,
    });
    this.spy = new Pusher('93d5b6db6095187f5ef6', {
      encrypted: true,
      authEndpoint: `${process.env.REACT_APP_API_URL}/pusher/auth`,
      cluster: 'us2',
      auth: {
        params: {
          isSpy: true
        }
      }
    });
    this.me = null;
    this.state = {
      currentView: { type: 'loading', id: null },
      rooms: [], // object of Stall components
      pusher_app_members: { count: 0 }, // pusher members object
      inLine: 0,
      message: '',
    };

    this.appChannel = null;
    this.queueChannel = null;

    this.countMembers = this.countMembers.bind(this);
    this.spyOn = this.spyOn.bind(this);
    this.startInactivityCheck = this.startInactivityCheck.bind(this);
    this.userActivityDetected = this.userActivityDetected.bind(this);
    this.handleExitStall = this.handleExitStall.bind(this);
    this.handleEnterHallway = this.handleEnterHallway.bind(this);
    this.handleEnterWaiting = this.handleEnterWaiting.bind(this);
    this.handleEnterRoom = this.handleEnterRoom.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateAppMembers = this.updateAppMembers.bind(this);
    this.updateMemberCount = this.updateMemberCount.bind(this);
    this.updateQueuePosition = this.updateQueuePosition.bind(this);
  }


  componentDidMount() {
    // initiate all rooms
    let roomsCopy = [];
    for (var i = 0; i < constants.NUM_ROOMS; i++) {
      roomsCopy.push({ id: i, occupants: 0 });
    }
    // update rooms state
    this.setState({
      rooms: roomsCopy,
    }, () => {
      // send spy to update room vacancies
      this.spyOn('presence-queue', 'waiting');
      for (var i = 0; i < constants.NUM_ROOMS; i++) {
        this.spyOn(`presence-room-${i}`, 'room');
      }
    });

    // main app channel
    this.appChannel = this.pusher.subscribe('presence-app');
    this.appChannel.bind('pusher:subscription_succeeded', (member) => {
      // console.log(member);
      this.updateAppMembers(this.appChannel.members);
      if (LOGGING) { console.log('Subscribed to Bathroom App'); }
    });
    this.appChannel.bind('pusher:member_added', (member) => {
      this.updateAppMembers(this.appChannel.members);
      if (LOGGING) {
        console.log(`${member.id} joined Bathroom App`);
        console.log(this.appChannel.members);
      }
    });
    // someone left App
    this.appChannel.bind('pusher:member_removed', (member) => {
      this.updateAppMembers(this.appChannel.members);
      if (LOGGING) {
        console.log(`${member.id} left Bathroom App`);
        console.log(this.appChannel.members);
      }
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('presence-app');
  }

  // returns a the number of members connected to channel
  // excluding spies
  countMembers(channel) {
    const memberObjList = Object.values(channel.members.members);
    const count = memberObjList.filter((member) => !member.isSpy).length;
    console.log(`Current users in ${channel.name}: ${count}`);
    return count
  };

  // generic 'true' member count (excludes spies)
  // num      :  number of true members
  // location :  location (by view name)
  // roomId   :  presence-room id (if in stall)
  // RETURNS  :  null
  updateMemberCount(num, location, roomId) {
    if (location === 'room') {
      var roomsCopy = Array.from(this.state.rooms);
      roomsCopy[roomId] = { id: roomId, occupants: num };
      this.setState(currentState => {
        return {
          rooms: roomsCopy,
        }
      });
    }
    else if (location === 'waiting') {
      this.setState(currentState => {
        return { inLine: num }
      });
    }
  }

  // in app
  updateAppMembers(members) {
    this.setState((prevState) => {
      return { pusher_app_members: members, }
    });
  }

  // spy on a channel
  spyOn(channelName, location) {
    var channel = this.spy.subscribe(channelName);
    var roomId = null;
    if (location === 'room') {
      roomId = channelName.split('-').pop();
    }
    if (LOGGING) {
      console.log(`trying to spy on ${channel.name}`);
    }
    channel.bind("pusher:subscription_succeeded", () => {
      // if (LOGGING) { console.log(`spying on ${channelName}`); }
      this.updateMemberCount(this.countMembers(channel), location, roomId);
    });
    channel.bind("pusher:member_added", (member) => {
      this.updateMemberCount(this.countMembers(channel), location, roomId);
    });
    channel.bind("pusher:member_removed", (member) => {
      if (!member.info.isSpy) { if (LOGGING) { console.log(`${member.id} left ${channelName}`); } }
      this.updateMemberCount(this.countMembers(channel), location, roomId);
    });
  };

  startInactivityCheck() {
    // console.log('starting timer for inactivity');
    this.timeoutId = window.setTimeout(() => {
      this.pusher.disconnect();
    }, constants.TIMEOUT); // SET TIMEOUT: time out after 5 minutes
  }

  updateQueuePosition(presenceChannel) {
    let me = presenceChannel.members.me.id;
    let trueOccupants = [];
    if (presenceChannel.members.count > 0) {
      presenceChannel.members.each((visitor) => {
        if (!visitor.info.isSpy) {
          trueOccupants.push(visitor);
        }
      });
      trueOccupants = constants.sortByEntryTime(trueOccupants);
    }
    console.log(`trueOccupants:`);
    console.log(trueOccupants);
    let ahead = trueOccupants.map((e) => { return e.id.toString() }).indexOf(me.toString());
    this.setState({ ahead: ahead });
  }

  userActivityDetected() {
    // timeout can be cleared from anywhere
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
    }
    // can be timed out of stall
    if (this.state.currentView.type === 'room') {
      this.startInactivityCheck();
    }
    // can be timed out at head (first 3) of queue
    if (this.state.currentView.type === 'waiting' && this.state.ahead < 3) {
      this.startInactivityCheck();
    }
    if (this.pusher.connection.state === 'disconnected') {
      alert(`You've been ushered out for taking too long! Please line up again to re-enter the bathroom.`);
      window.location.reload();
    }
  }

  /* BEGIN: View transition functions
    -----------------------------------
  */
  // stall -> mirrors
  handleExitStall(e) {
    if (window.confirm("Ready to leave the bathroom?")) {
      this.setState(currentState => {
        return {
          currentView: { type: 'mirrors', id: null },
        }
      },
      () => { constants.restartParallax('.layer');
      });
    }
  }

  handleEnterHallway(e) {
    this.setState(currentState => {
      return {
        currentView: { type: 'hallway', id: null },
      }
    },
    () => {constants.restartParallax('.layer');});
  }

  // hallway -> wait for stall
  handleEnterWaiting(e) {
    this.setState(currentState => {
      return {
        currentView: { type: 'waiting', id: null },
      }
    },
    () => {
      constants.restartParallax('.layer');
      this.queueChannel = this.pusher.subscribe(`presence-queue`);
      this.queueChannel.bind('pusher:subscription_succeeded', () => {
        console.log('Joined Waiting Room');
        this.updateMemberCount(this.countMembers(this.queueChannel), 'waiting');
        this.updateQueuePosition(this.queueChannel);
      });
      this.queueChannel.bind('pusher:member_added', () => {
        this.updateMemberCount(this.countMembers(this.queueChannel), 'waiting');
      });
      this.queueChannel.bind('pusher:member_removed', (member) => {
        this.updateMemberCount(this.countMembers(this.queueChannel), 'waiting');
        this.updateQueuePosition(this.queueChannel);
        if (!member.info.isSpy) { console.log(`WaitingRoom.js: someone left the queue`); }
      });

    });
  }

  // waiting -> stall
  handleEnterRoom(e) {
    var roomEntered = false;
    this.pusher.unsubscribe('presence-queue');

    // check all rooms for vacancy
    for (var i = 0; !roomEntered && i < this.state.rooms.length; i++) {
      var currentRoom = {...this.state.rooms[i]};
      let roomId = i;
      if (currentRoom.occupants < constants.MAX_OCCUPANCY) {
        this.updateMemberCount(currentRoom.occupants+1, 'room', i);
        this.setState(currentState => {
          return {
            currentView: { type: 'room', id: roomId },
          };
        }, () => { constants.restartParallax('.layer') });
        roomEntered = true;
      }
      else {
        console.log(`Room ${i} full`);
      }
    }

    if (!roomEntered) {
      alert('Sorry, no vacant stalls currently available!');
    }
  }

  handleMouseMove() {
    this.userActivityDetected();
  }

  render() {
    var hide = true;
    if (process.env.NODE_ENV === 'production') {
      hide = 'hide';
    }

    // if (LOGGING) { console.log('rendering App.js'); }
    // if (LOGGING) { console.log(this.state.rooms); hide = null }

    // Render debug console data
    var rooms = 'Initiating rooms...';
    if (this.state.rooms.length === constants.NUM_ROOMS) {
      rooms = this.state.rooms.map((room) =>
        <li key={room.id.toString()}><strong>Room {room.id}:</strong> {room.occupants}/{constants.MAX_OCCUPANCY}</li>
      );
    }

    const vacancies = constants.MAX_OCCUPANCY * constants.NUM_ROOMS - this.state.rooms.map((room) => room.occupants ).reduce((a, b) => a + b, 0);
    let currentView = <Loading onLoad={this.handleEnterHallway} />;
    if (this.state.currentView.type === 'hallway') {
      currentView = <Hallway onEnterBathroom={this.handleEnterWaiting} />;
    }
    else if (this.state.currentView.type === 'mirrors') {
      currentView = <Mirrors />;
    }
    else if (this.state.currentView.type === 'waiting') {
      currentView = <WaitingRoom queuePosition={this.state.ahead} inLineTotal={this.state.inLine} currentVacancies={vacancies} handleEnterRoomClick={this.handleEnterRoom} />;
    }
    if (this.state.currentView.type === 'room') {
      currentView = <Room id={this.state.currentView.id} pusher={this.pusher} max={constants.MAX_OCCUPANCY} onOccupancyChange={this.updateMemberCount} onExit={this.handleExitStall} />;
    }
    return (
      <div id="app" onMouseMove={this.handleMouseMove}>
        <div id="debug-console" className={hide ? 'hide' : undefined}>
          <div>
            THE APP IS RUNNING IN <strong>{process.env.NODE_ENV}</strong> MODE<br/>
            this box is for development purposes only
          </div>
          <div>
            <div>Number of Rooms: {constants.NUM_ROOMS}</div>
            <div><strong>Current Users:</strong> {this.state.pusher_app_members.count}</div>
            <div><strong>In line:</strong> {this.state.inLine}</div>
            <div><strong>Vacancies:</strong> {vacancies}</div>
          </div>
          <div>
            <strong>Rooms:</strong>
            {rooms}
          </div>
        </div>
        {currentView}
      </div>
    );
  }

}

export default App;