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

export const MAX_OCCUPANCY = 3;
export const NUM_ROOMS = 2;
export const IMAGES = importAll(require.context('./assets/images/', false, /\.(png|jpe?g|svg)$/));