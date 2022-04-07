export const KeyEvent = class {
  #events: Map<string, Function>;
  #currentKeyCodes: string[];
  #currentKeydownEventFunction: Function | null;
  constructor() {
    this.#events= new Map();
    this.#currentKeyCodes= [];
    this.#currentKeydownEventFunction= null;


    document.body.addEventListener('keyup', ( e: KeyboardEvent ): void => {
      const keyCode: string = e.code;
      this.#currentKeyCodes = this.#currentKeyCodes.filter( item => item !==  keyCode);
    });
    this.#setUpKeydownEventListener()
  }

  #validateKeyCombination = ( keyCombination: string[] ): Boolean => {
    if ( !Array.isArray(keyCombination) ) {
      console.error(`First input of addEvent must be an Array!`);
      return false;
    }
    if ( keyCombination.length <= 0 ) {
      console.error(`First input of addEvent must have length of more than 0!`);
      return false;
    }
    return true;
  }

  addEvent = ( keyCombination: string[], eventFn:Function ): void => {
    if ( typeof eventFn !== 'function' ) {
      console.error(`Second input of addEvent must be a Function!`);
      return;
    }
    if ( !this.#validateKeyCombination(keyCombination) ) return;
    
    const keyCombinationString = keyCombination.sort().join('');
    if ( this.#events.has( keyCombinationString ) ) {
      console.warn('This key combination has been added before!');
      return;
    }

    this.#events.set( keyCombinationString, eventFn );
    this.#setUpKeydownEventListener();
  }

  removeEvent = ( keyCombination: string[] ) => { 
    if ( !this.#validateKeyCombination(keyCombination) ) return;

    const keyCombinationString = keyCombination.sort().join('');
    this.#events.delete( keyCombinationString );
  }

  #setUpKeydownEventListener = (): void => {
    this.#currentKeydownEventFunction && document.body.removeEventListener( 'keydown', ( e: KeyboardEvent ) =>  this.#currentKeydownEventFunction!(e) ); // removing prevues event listener

    this.#currentKeydownEventFunction = ( e: KeyboardEvent ): void => {
      if ( !this.#currentKeyCodes.includes( e.code ) ) this.#currentKeyCodes.push( e.code );
      const currentKeyCodesString = this.#currentKeyCodes.sort().join('');

      this.#events.get(currentKeyCodesString) && this.#events.get(currentKeyCodesString)!()
    };
    document.body.addEventListener( 'keydown', ( e: KeyboardEvent ) => this.#currentKeydownEventFunction!(e) );

  }
};