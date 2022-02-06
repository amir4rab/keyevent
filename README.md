# Key event

key event is a simple and light library that helps you with invoking functions upon Specified key combinations ( eg: showing a modal when "Control Left" and "X" are clicked simultaneously ).

### installing
```bash
npm install @amir4rab/keyevent@latest
```

### Importing
```javascript
import KeyEvent from '@amir4rab/keyevent'; // typescript implementation
// or
import KeyEvent from '@amir4rab/keyevent/js/index'; // compiled version in javascript
```

### Usage

```javascript
  const keyEvent = new KeyEvent();

  // adding an event
  keyEvent.addEvent( 
    // key combinations must be an array of keydown codes
    [ 'KeyA', 'LeftShift' ], // key combination
    _ => { console.log('event') } // event function
  );

  // removing an event
  keyEvent.removeEvent(
    [ 'KeyA', 'LeftShift' ] // key combination
  );

```