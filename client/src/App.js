import React, { useState, useEffect } from 'react';

//components
import Navigation from './components/navbar/Navigation';
import ShowTopbooks from './components/ShowTopBooks';
import SearchBooks from './components/SearchBooks';
import ShowBook from './components/ShowBook';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import BooksByCatagory from './components/catagories/BooksByCatagory';
import PrivateRoute from './components/Routes/PrivateRoute';

//router
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

//context
import { SearchProvider } from './context';
import UserContext from './components/Sessions/context';
import CatagoryContext from './components/catagories/context';
//firebase
import { withFirebase } from './components/Firebase/context';
import './App.css';

function App({ firebase }) {
  const [searchData, setSearchData] = useState({ type: '', value: '' });
  const [catagoryData, setCatagoryData] = useState('');
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ? setAuthUser({ authUser }) : setAuthUser(null);
    });
  }, [firebase.auth]);

  let searchDataObj = {
    searchData,
    setSearchData
  };
  let catagoryDataObj = {
    catagoryData,
    setCatagoryData
  };
  return (
    <UserContext.Provider value={authUser}>
      <Router history={history}>
        <div className='App'>
          <SearchProvider value={searchDataObj}>
            <Navigation />
          </SearchProvider>
          <main>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <Route exact path='/' component={ShowTopbooks} />
              {/* <Route exact path='/showbook' component={ShowBook} /> */}
              <Route path='/showbook/:isbn' component={ShowBook} />
              <SearchProvider value={searchDataObj}>
                <Route exact path='/searchresults' component={SearchBooks} />
              </SearchProvider>
              <CatagoryContext.Provider value={catagoryDataObj}>
                <Route path='booksByCatagory' component={BooksByCatagory} />
              </CatagoryContext.Provider>
            </Switch>
          </main>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default withFirebase(App);
