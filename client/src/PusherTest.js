import React from 'react';
import Pusher from 'pusher-js';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('93d5b6db6095187f5ef6', {
  cluster: 'us2',
  authEndpoint: '/pusher/auth'
});

var channel = pusher.subscribe('presence-channel');
channel.bind('new-user', function(data) {
  alert(JSON.stringify(data));
});

function PusherTest() {
  return (
    <div className="PusherTest">
      <h1>Pusher Test</h1>
      <p>
        Try publishing an event to channel <code>my-channel</code>
        with event name <code>my-event</code>.
      </p>
    </div>
  );
}

export default PusherTest;
