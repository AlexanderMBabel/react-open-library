import React from 'react';
import ReactDOM from 'react-dom';

import Firebase from './components/Firebase/Firebase';
import FirebaseContext from './components/Firebase/context';

import App from './App';
import 'typeface-roboto';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
