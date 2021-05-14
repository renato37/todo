import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Register from './containers/register';
import Login from './containers/login';
import Header from './containers/header';
import User from './containers/userProfile';
import {Route, Switch} from 'react-router-dom';
import Routes from './appconfig/routes';
function App() {
  return (
      <div className="App">
        <Header/>
        <div className="body">
          <Switch>
            <Route exact path={Routes.home} component={User} />
            <Route exact path={Routes.register} component={Register} />
            <Route exact path={Routes.login} component={Login} />
            
          </Switch>
        </div>
      </div>
  );
}

export default App;
