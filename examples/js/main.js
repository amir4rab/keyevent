// import './style.css'
import KeyEventManager from '../../src/index';

const superHiddenPopup = document.getElementById('superHiddenPopup');
document.getElementById('hidePopupButton').addEventListener('click', _ => { superHiddenPopup.className = 'hidden' } );

const keyEventManager = new KeyEventManager();

keyEventManager.addEvent( [ 'KeyX', 'ControlLeft' ], _ => { superHiddenPopup.className = 'show' } );
keyEventManager.addEvent( [ 'KeyZ', 'ControlLeft' ], _ => { superHiddenPopup.className = 'hidden' } );

keyEventManager.addEvent( [ 'KeyA', 'LeftShift' ], _ => { superHiddenPopup.className = 'show' } );
keyEventManager.removeEvent([ 'KeyA', 'LeftShift' ])
