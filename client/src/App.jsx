import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
    const res = await verifyUser();
    if (res.user) {
      this.setUser(res.user);
    }
  }

  setUser = (user) =>
    this.setState({
      user: {
        ...user,
        id: user.id || user._id,
      },
    });

  clearUser = () => this.setState({ user: null });

  render() {
    const { setUser, clearUser } = this;
    const { user } = this.state;
    return (
      <div className="app">
        <AnimatePresence exitBeforeEnter initial={false}>
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
            <Route exact path="/items" render={() => <Items user={user} />} />
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
              path="/items/detail/:itemId"
              render={(props) => (
                <ItemDetail {...props} history={props.history} user={user} />
              )}
            />
          </Switch>
        </AnimatePresence>
      </div>
    );
  }
}

export default App;
