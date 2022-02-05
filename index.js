export const KeyEventManager = class {
  #currentKeyCodes;
  #events;
  #currentKeydownEventFunction;
  constructor() {
    this.#events= new Map();
    this.#currentKeyCodes= [];
    this.#currentKeydownEventFunction= null;


    document.body.addEventListener('keyup', e => {
      this.#currentKeyCodes = this.#currentKeyCodes.filter( item => item !==  e.code );
    });
    this.#setUpKeydownEventListener()
  }

  addEvent = ( keyCombination, eventFn ) => {
    const keyCombinationString = keyCombination.sort().join('');
    if ( this.#events.has( keyCombinationString ) ) {
      console.warn('This key combination has been added before!');
      return;
    }

    this.#events.set( keyCombinationString, eventFn );
    this.#setUpKeydownEventListener();
  }

  removeEvent = ( keyCombination ) => { 
    const keyCombinationString = keyCombination.sort().join('');
    this.#events.delete( keyCombinationString );
  }

  #setUpKeydownEventListener = _ => {
    this.#currentKeydownEventFunction && document.body.removeEventListener( 'keydown', this.#currentKeydownEventFunction ); // removing prevues event listener

    this.#currentKeydownEventFunction = ( e ) => {
      if ( !this.#currentKeyCodes.includes(e.code) ) this.#currentKeyCodes.push(e.code);
      const currentKeyCodesString = this.#currentKeyCodes.sort().join('');

      this.#events.get(currentKeyCodesString) && this.#events.get(currentKeyCodesString)()
    };
    document.body.addEventListener( 'keydown', this.#currentKeydownEventFunction );

  }
}

export default KeyEventManager;