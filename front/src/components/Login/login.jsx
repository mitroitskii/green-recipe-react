/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginFetchAC, clearStatusAC } from '../../redux/actions/actions';

// import { Box, Text, Button } from 'grommet';
// import { TextInputField, Form, PasswordInputField, EmailInputField, CheckBoxField, validators } from 'grommet-controls';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearStatus();
  }

  handleUsername(event) {
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
            <p>
              <label>
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={this.handleUsername}
              />
            </p>
            <p>
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
            </p>
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
    logRegstatusError: store.logRegstatusError
  };
}


function mapDispatchToProps(dispatch) {
  return {
    loginFetch: data => dispatch(loginFetchAC(data)),
    clearStatus: () => dispatch(clearStatusAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


///Форма по Grommet.Почему-то не вводится текст в username

{/* <Form
  basis='medium'
  focusFirstChild={false}
  {...this.props}
  onSubmit={this.handleSubmit}
>
  <TextInputField label='Username' name='username' onChange={this.handleUsername} />
  <PasswordInputField
    label={(
      <Box direction='row' align='center' justify='between'>Password</Box>
    )}
    description='Password'
    name='password'
    validation={
      [validators.required(), validators.minLength(5), validators.alphaNumeric()]
    }
    onChange={this.handlePassword}
  />
  <Box pad={{ vertical: 'medium' }} align='end'>
    <Button hoverIndicator='background' primary={true} type='submit' label='Save profile' />
  </Box>
  <Box direction='row' alignSelf='center' gap='small' align='center'></Box>
</Form> */}



