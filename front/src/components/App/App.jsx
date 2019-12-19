import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { isLoggedFetchAC } from '../../redux/actions/actions';
import './app.css';

import Navbar from '../Navbar/navbar';
import Login from '../Login/login';
import Registration from '../Registration/registration';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipePage from '../RecipePage/RecipePage';

import PrivateRoute from '../Routes/privateRoute';
import HomeRoute from '../Routes/homeRoute';

import Home from '../Home/homepage';
import UserAccount from '../UserAccount';

class App extends React.Component {
  async componentDidMount() {
    // проверка авторизации
    this.props.isLoggedFetch();
  }

  render() {
    // const theme = {
    //   global: {
    //     colors: {
    //       brand: 'lightgreen',
    //     },
    //     font: {
    //       family: 'Roboto',
    //       size: '18px',
    //       height: '20px',
    //     },
    //   },
    // };
    return (
      <Router >
        <Grommet theme={hpe} >
          <Box fill>
            <AppBar>
              <Navbar />
            </AppBar>
            <Box direction="row" flex overflow={{ horizontal: 'hidden' }} />
            <Box flex align="center" justify="center">
              <Switch>
                <Route exact path="/recipes" component={Home} />
                <Route exact path="/recipes/new" component={RecipeForm} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/recipes/:id" component={RecipePage} />
                <PrivateRoute exact path="/users/:id" Component={UserAccount} />
                <PrivateRoute exact path="/" Component={Home} />
                <PrivateRoute exact path="/recipes/:id/edit" Component={RecipeForm} />
              </Switch>
            </Box>
          </Box>
        </Grommet>
      </Router>
    );
  }
}

const AppBar = props => (
  <Box
    direction="column"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
);

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    userId: store.userId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isLoggedFetch: () => dispatch(isLoggedFetchAC()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
