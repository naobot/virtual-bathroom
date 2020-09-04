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

export function makeId(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

export const MAX_OCCUPANCY = 3;
export const NUM_ROOMS = 5;
export const IMAGES = importAll(require.context('./assets/images/', false, /\.(png|jpe?g|svg)$/));