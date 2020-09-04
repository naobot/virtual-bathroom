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

export const MAX_OCCUPANCY = 3;
export const NUM_ROOMS = 2;
export const IMAGES = importAll(require.context('./assets/images/', false, /\.(png|jpe?g|svg)$/));