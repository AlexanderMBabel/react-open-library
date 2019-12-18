import React, { useState } from 'react';

//components
import Navigation from './components/navbar/Navigation';
import ShowTopbooks from './components/ShowTopBooks';
import SearchBooks from './components/SearchBooks';
import ShowBook from './components/ShowBook';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

import { SearchProvider } from './context';
import './App.css';

function App() {
  const [searchData, setSearchData] = useState({ type: '', value: '' });

  let searchDataObj = {
    searchData,
    setSearchData
  };
  return (
    <Router history={history}>
      <div className='App'>
        <SearchProvider value={searchDataObj}>
          <Navigation />
        </SearchProvider>
        <main>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route exact path='/' component={ShowTopbooks} />
            {/* <Route exact path='/showbook' component={ShowBook} /> */}
            <Route path='/showbook/:isbn' component={ShowBook} />
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
