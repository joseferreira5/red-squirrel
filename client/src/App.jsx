import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Items from './components/Items';
import ItemCreate from './components/ItemCreate';
import ItemEdit from './components/ItemEdit';
import ItemDetail from './components/ItemDetail';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

import { verifyUser } from './services/user';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await verifyUser();
    if (user) {
      this.setState({ user });
    }
  }

  setUser = (user) => this.setState({ user });

  clearUser = () => this.setState({ user: null });

  render() {
    const { setUser, clearUser } = this;
    const { user } = this.state;
    return (
      <div className="app">
        
        <Switch>
          <Route exact path="/" render={() => <Home user={user} />} />
          <Route
            exact
            path="/sign-up"
            render={(props) => (
              <SignUp setUser={setUser} history={props.history} />
            )}
          />
          <Route
            exact
            path="/sign-in"
            render={(props) => (
              <SignIn setUser={setUser} history={props.history} />
            )}
          />
          <Route
            exact
            path="/sign-out"
            render={(props) => (
              <SignOut
                user={user}
                clearUser={clearUser}
                history={props.history}
              />
            )}
          />
          <Route
            exact
            path="/items/:userId"
            render={() => <Items user={user} />}
          />
          <Route
            exact
            path="/add-item"
            render={() =>
              user ? <ItemCreate user={user} /> : <Redirect to="/signup" />
            }
          />
          <Route
            exact
            path="/items/:id/edit"
            render={(props) =>
              user ? <ItemEdit {...props} user={user} /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/items/:userId/:itemId"
            render={(props) => (
              <ItemDetail {...props} history={props.history} user={user} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
