import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { isLoggedFetchAC } from '../../redux/actions/actions';

// import './App.css';

import Navbar from '../Navbar/navbar';
import Login from '../Login/login';
import Registration from '../Registration/registration';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipePage from '../RecipePage/RecipePage';
import RecipeEdit from '../RecipeForm/RecipeEdit';

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
      <Router>
        <Grommet theme={hpe}>
          <Box align="center" justify="center" align="center" width="100%">
            <Navbar />
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/recipes" component={Home} />
              <PrivateRoute exact path="/recipes/new" Component={RecipeForm} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/recipes/:id" component={RecipePage} />
              <PrivateRoute
                exact
                path="/recipes/:id/edit"
                Component={RecipeEdit}
              />
              <PrivateRoute exact path="/users/:id" Component={UserAccount} />
              <PrivateRoute
                exact
                path="/recipes/:id/edit"
                Component={RecipeEdit}
              />
            </Switch>
          </Box>
        </Grommet>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    userId: store.userId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isLoggedFetch: () => dispatch(isLoggedFetchAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
