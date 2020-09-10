import Parallax from 'parallax-js';

export function importAll(r) {
  return r.keys().map(r);
}

export function restartParallax(selector) {
  var container = document.getElementById('app');
  var parallaxInstance = new Parallax(container, {
    selector: selector,
    pointerEvents: true,
  });
}

export function scrollToBottom(element) {
    element.scrollIntoView({ behavior: "smooth" });
  }

export function sortByEntryTime(occupants) {
  let sorted = []
  occupants.forEach((member) => {
    sorted.push(member);
  });
  return sorted.sort((a,b) => {
    if (parseInt(a.info.entry_time) < parseInt(b.info.entry_time)) { return -1 }
    if (parseInt(a.info.entry_time) > parseInt(b.info.entry_time)) { return 1 }
    return 0
  });
}

export const PSEUDONYMS = [
  'someone',
  'somebody',
  'a stallmate',
  'a person',
  'another person',
  'person in next stall',
  'some person',
];

export const CONVOS = [
  [
    {
      time: '11:34 AM',
      from: 'Mom',
      message: 'I need you to help me write a complaint letter for work',
    },
    {
      time: '11:34 AM',
      from: 'Mom',
      message: 'I will call you tonight',
    },
    {
      time: '11:35 AM',
      from: 'Mom',
      message: 'And what is the password for the tablet?',
    },
    {
      time: '11:35 AM',
      from: 'Mom',
      message: 'Love, Mom',
    },
  ],
  [
    {
      time: '3 days ago',
      from: 'Me',
      message: 'Can you please send someone to take a look at our fridge? The freezer isn’t working, we have it on the coldest setting but it’s not cold. We’ve had to throw out the food we had in there. Thanks.',
    },
    {
      time: '1 day ago',
      from: 'Me',
      message: 'Hello, I’m writing again re. our fridge. It’s broken and the settings don’t work. Can you please let me know when you are going to send someone to look at it?',
    },
    {
      time: '1:58 PM',
      from: 'Landlord',
      message: 'The fridge is new so there shouldn’t be any problem with it. Have you tried changing it to the coldest setting?',
    },
  ],
  [
    {
      time: '10:24 AM',
      from: 'Me', 
      message: "I had a really nice time with u !"
    },
    {
      time: '10:45 AM',
      from: 'Sky',
      message: 'yes me too!!'
    },
    {
      time: '11:20 AM',
      from: 'Sky',
      message: 'When can I kiss u again?!'
    },
  ],
  [
    {
      time: '11:30 PM',
      from: 'Lily',
      message: "hey is 6pm still good to work on the thing tonight?",
    },
    {
      time: '12:01 PM',
      from: 'Me',
      message: "hey sorry I don’t think I can do tonite anymore… I had a really long day, I want to go home and lie down. Can we do tm?",
    },
    {
      time: '12:40 PM',
      from: 'Lily',
      message: "oh no im sorry to hear! I’m busy tomorrow and the rest of this week tho, tonight is the only time I have free :(",
    },
  ],
];

export const MAX_OCCUPANCY = 3;
export const NUM_ROOMS = 2;
export const IMAGES = importAll(require.context('./assets/images/', false, /\.(png|jpe?g|svg)$/));