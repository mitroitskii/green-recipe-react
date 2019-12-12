/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginFetchAC, clearStatusAC } from '../../redux/actions/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearStatus();
  }

  handleLogin(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.loginFetch({
      username: this.state.username,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div className={'form-style-1'}>
        <form id="userLogIn" onSubmit={this.handleSubmit}>
          <div className={'container'}>
            <h1>Login</h1>
            <p>Please login</p>
            <hr />
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              onChange={this.handleLogin}
            />
            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={this.handlePassword}
            />
            <hr />
            <button type="submit" className={'loginbtn'}>
              Login
            </button>
          </div>
        </form>
        <div>
          {this.props.logRegloadingFetch ? (
            <span className={'statustext'}>loading</span>
          ) : this.props.isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <span className={'statustext'}>{this.props.logRegstatusError}</span>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    logRegloadingFetch: store.logRegloadingFetch,
    logRegstatusError: store.logRegstatusError,
  };
}

// Без ActionCreator
// function mapDispatchToProps(dispatch) {
//   return {
//     addTodo: (taskName) => dispatch( {type: 'ADD_TODO', title: taskName} )
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    loginFetch: data => dispatch(loginFetchAC(data)),
    clearStatus: () => dispatch(clearStatusAC()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
