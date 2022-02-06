// import './style.css'
import KeyEventManager from '../../../index';

const superHiddenPopup = document.getElementById('superHiddenPopup') as HTMLElement;
document.getElementById('hidePopupButton')!.addEventListener('click', () => { superHiddenPopup.className = 'hidden' } );

const keyEventManager = new KeyEventManager();

keyEventManager.addEvent( [ 'KeyX', 'ControlLeft' ], () => { superHiddenPopup.className = 'show' } );
keyEventManager.addEvent( [ 'KeyZ', 'ControlLeft' ], () => { superHiddenPopup.className = 'hidden' } );

keyEventManager.addEvent( [ 'KeyA', 'LeftShift' ], () => { superHiddenPopup.className = 'show' } );
keyEventManager.removeEvent([ 'KeyA', 'LeftShift' ])
