import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login/login.jsx';
import Register from './pages/login/register.jsx';
import UserHome from './pages/home-user/index';
import UserSetting from './pages/setting-user/index';
import AllWriters from './pages/all-writers/index';

import Write from './pages/write';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Route path='/' exact component={Home}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/register' exact component={Register}></Route>
            <Route path='/write' exact component={Write}></Route>
            <Route path='/userhome/:id' exact component={UserHome}></Route>
            <Route path='/usersetting' exact component={UserSetting}></Route>
            <Route path='/all-writers' exact component={AllWriters}></Route>
            
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
