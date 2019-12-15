import React, { useState } from 'react';

//components
import Navigation from './components/navbar/Navigation';
import ShowTopbooks from './components/ShowTopBooks';
import SearchBooks from './components/SearchBooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SearchProvider } from './context';
import './App.css';

function App() {
  const [searchData, setSearchData] = useState({ type: '', value: '' });

  let searchDataObj = {
    searchData,
    setSearchData
  };
  return (
    <Router>
      <div className='App'>
        <SearchProvider value={searchDataObj}>
          <Navigation />
        </SearchProvider>
        <main>
          <Switch>
            <Route exact path='/' component={ShowTopbooks} />
            <SearchProvider value={searchDataObj}>
              <Route exact path='/searchresults' component={SearchBooks} />
            </SearchProvider>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
