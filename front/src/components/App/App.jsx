import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedFetchAC } from '../../redux/actions/actions';

// import './App.css';

import Navbar from '../Navbar/navbar';
import Login from '../Login/login';
import Registration from '../Registration/registration';

import PrivateRoute from '../Routes/privateRoute';
import HomeRoute from '../Routes/homeRoute';

import Home from '../Home/homepage';

class App extends React.Component {
  async componentDidMount() {
    // проверка авторизации
    this.props.isLoggedFetch();
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <PrivateRoute exact path="/" Component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isLoggedFetch: () => dispatch(isLoggedFetchAC()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
