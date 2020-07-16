import React, { Component } from 'react';
import Pusher from 'pusher-js';
import Hallway from './Hallway'
import WaitingRoom from './WaitingRoom';
import Room from './Room';
import './css/normalize.css';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.pusher = new Pusher('93d5b6db6095187f5ef6', {
      cluster: 'us2',
      encrypted: true,
    });
    this.spy = new Pusher('93d5b6db6095187f5ef6', {
      encrypted: true,
      cluster: 'us2',
      auth: {
        params: {
          isSpy: true
        }
      }
    });
    this.me = null;
    this.state = {
      currentView: { type: 'hallway', id: null },
      rooms: [], // object of Room components
      pusher_app_members: { count: 0 }, // pusher members object
      inLine: 0,
      message: '',
    };
    this.max_occupancy = 2; // ADJUST AS NEEDED
    this.num_rooms = 2; // ADJUST AS NEEDED
    this.countMembers = this.countMembers.bind(this);
    this.spyOn = this.spyOn.bind(this);
    this.handleEnterBathroom = this.handleEnterBathroom.bind(this);
    this.handleEnterRoom = this.handleEnterRoom.bind(this);
    this.updateMemberCount = this.updateMemberCount.bind(this);
  }


  componentDidMount() {
    this.spyOn('presence-bathroom', 'waiting');
    for (var i = 0; i < this.num_rooms; i++) {
      this.spyOn(`presence-room-${i}`, 'room');
    }
    // main app channel
    this.presenceChannel = this.pusher.subscribe('presence-app');
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.me = this.presenceChannel.members.me.id;
      this.updateAppMembers(this.presenceChannel.members);
      // console.log(this.presenceChannel.members.me.id + ' subscribed to WaitingRoom');
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateAppMembers(this.presenceChannel.members);
      console.log(`currentViewType: ${this.state.currentViewType}`);
      // console.log('someone joined Bathroom App');
    });
    // someone left App
    this.presenceChannel.bind('pusher:member_removed', (member) => {
      this.updateAppMembers(this.presenceChannel.members);
      console.log(`${member.id} left Bathroom App`);
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('presence-app');
  }

  // returns a the number of members connected to channel
  // excluding spies
  countMembers(channel) {
    // console.log("Current users in " + channel.name + ":");
    var count = 0;
    // var roomId = channel.name.split('-').pop();
    channel.members.each(function (member) {
      if (!member.info.isSpy) { console.log("user: " + member.id); count++; }
    });
    return count
  };

  // generic 'true' member count (excludes spies)
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
    this.setState({
      pusher_app_members: members,
    });
  }

  // spy on a channel
  spyOn(channelName, location) {
    var channel = this.spy.subscribe(channelName);
    var roomId = null;
    if (location === 'room') {
      roomId = channelName.split('-').pop();
    }
    // console.log('trying to spy');
    // console.log(channel);
    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`spying on ${channelName}`);
      this.updateMemberCount(this.countMembers(channel), location, roomId);
    });
    channel.bind("pusher:member_added", () => {
      this.updateMemberCount(this.countMembers(channel), location, roomId);
    });
    channel.bind("pusher:member_removed", () => {
      console.log(`someone left ${channelName}`);
      this.updateMemberCount(this.countMembers(channel), location, roomId);
    });
  };

  /* BEGIN: View transition functions 
    -----------------------------------
  */
  // hallway -> bathroom
  handleEnterBathroom(e) {
    this.setState(currentState => {
      return {
        currentView: { type: 'waiting', id: null },
      }
    })
  }

  // bathroom -> room
  handleEnterRoom(e) {
    var roomEntered = false;
    this.pusher.unsubscribe('presence-bathroom');

    for (var i = 0; !roomEntered && i < this.state.rooms.length; i++) {
      var currentRoom = {...this.state.rooms[i]};
      let roomId = i;
      if (currentRoom.occupants < this.max_occupancy) {
        this.updateMemberCount(currentRoom.occupants+1, 'room', i);
        this.setState(currentState => {
          return {
            currentView: { type: 'room', id: roomId },
          };
        });
        roomEntered = true;
      }
      else {
        console.log(`Room ${i} full`);
      }
    }

    if (!roomEntered) {
      alert('no vacant rooms available!');
    }
  }

  render() {
    const rooms = this.state.rooms.map((room) =>
      <li key={room.id.toString()}>Room {room.id}: {room.occupants}/{this.max_occupancy}</li>
    );

    // let visitorsList = [];
    // if (this.state.pusher_app_members.count > 0) {
    //   this.state.pusher_app_members.each((visitor) => 
    //     visitorsList.push(<li key={visitor.id.toString()}>{visitor.id}</li>)
    //   );
    // }
    // default view is hallway
    let currentView = <Hallway onEnterBathroom={this.handleEnterBathroom} />
    if (this.state.currentView.type === 'waiting') { 
      currentView = <WaitingRoom onEnterRoom={this.handleEnterRoom} pusher={this.pusher} onOccupancyChange={this.updateMemberCount} />; 
    }
    if (this.state.currentView.type === 'room') {
      currentView = <Room id={this.state.currentView.id} pusher={this.pusher} max={this.max_occupancy} onOccupancyChange={this.updateMemberCount} />;
    }
    return (
      <div id="app">
        <div id="debug-console" className="hide">
          Number of Rooms: {this.num_rooms}<br/>
          <h3>Current Users: {this.state.pusher_app_members.count}</h3>
          <p><strong>In line:</strong> {this.state.inLine}</p>
          <h3>Rooms</h3>
          {rooms}<br/>
        </div>
        {currentView}
      </div>
    );
  }

}

export default App;