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
      message: 'I need you to help me write a complaint letter',
    },
    {
      time: '11:34 AM',
      from: 'Me',
      message: 'OK... What is it about? Is it for work?',
    },
    {
      time: '1:11 PM',
      from: 'Mom',
      message: 'I’ll call you tonight to tell you. What time?',
    },
  ],
  [
    {
      time: '12:58 PM',
      from: 'Me',
      message: 'hey sorry I don’t think I’ll be able to meet up tonite... Just got hit with wave of tiredness and need to lie down... I’ll text u sometime tomorrow tho?',
    },
    {
      time: '1:24 PM',
      from: 'Micah',
      message: 'ya of course',
    },
    {
      time: '1:24 PM',
      from: 'Micah',
      message: 'r u ok?',
    },
    {
      time: '1:24 PM',
      from: 'Micah',
      message: 'do u need anything?',
    },
  ],
  [
    {
      time: '3 days ago',
      from: 'Me',
      message: 'Can you please send someone to take a look at our fridge? The freezer doesn’t seem to be working properly. It’s not cold enough even though we have it on the coldest setting, and we’ve had to throw out the food we had in there.<br/>Thanks. LMK.',
    },
    {
      time: '1 day ago',
      from: 'Me',
      message: 'Hello, I’m writing again re. our fridge. Can you please let me know when you are going to send someone to look at it?',
    },
    {
      time: '1:58 PM',
      from: 'Landlord',
      message: 'The fridge is new so there shouldn’t be any problem with it. Have you tried changing the setting to the coldest temperature?',
    },
  ],
  [
    {
      time: '1:24 PM',
      from: 'Lily',
      message: "I'm so fucking annoyed",
    },
    {
      time: '2:01 PM',
      from: 'Me',
      message: "oh no what happened?",
    },
    {
      time: '2:01 PM',
      from: 'Lily',
      message: "Vincent is so fucking selfish and irresponsible",
    },
    {
      time: '2:01 PM',
      from: 'Lily',
      message: "I was supposed to go see my parents for the first time in a month but now I have to cancel",
    },
    {
      time: '2:02 PM',
      from: 'Lily',
      message: "Because maybe vincent exposed us to covid",
    },
    {
      time: '2:03 PM',
      from: 'Lily',
      message: "Anyway I yelled at him but can you also talk to him for me?????? I feel like he doesn’t listen to me",
    },
  ],
];

export const MAX_OCCUPANCY = 3;
export const NUM_ROOMS = 2;
export const IMAGES = importAll(require.context('./assets/images/', false, /\.(png|jpe?g|svg)$/));