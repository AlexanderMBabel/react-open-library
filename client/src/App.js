import React from 'react';

import Navigation from './components/navbar/Navigation';
import ShowTopbooks from './components/ShowTopBooks';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <ShowTopbooks />
    </div>
  );
}

export default App;
