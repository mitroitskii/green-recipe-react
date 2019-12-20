/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginFetchAC, clearStatusAC } from '../../redux/actions/actions';
import Preloader from '../Preloader/preloader';
import { Box, Text, Button, Heading } from 'grommet';

import {
  TextInputField,
  Form,
  PasswordInputField,
  validators
} from 'grommet-controls';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearStatus();
  }

  async handleSubmit(values) {
    this.props.loginFetch({
      username: values.username,
      password: values.password
    });
  }

  render() {
    return (
      <Box
        width="30%"
        margin="large"
        pad="large"
        border={{ color: 'border' }}
        justify="center"
        align="center"
        elevation="medium"
      >
        <Heading
          level="2"
          margin={{
            top: 'none',
            bottom: 'small'
          }}
          
        >
          Вход
        </Heading>
        <Form
          basis="medium"
          focusFirstChild={false}
          {...this.props}
          onSubmit={this.handleSubmit}
        >
          <TextInputField label="Имя" name="username" />
          <PasswordInputField
            label={
              <Box direction="row" align="center" justify="between">
                Пароль
              </Box>
            }
            description="Password"
            name="password"
            validation={[validators.required()]}
          />
          <Box pad={{ vertical: 'medium' }} align="end">
            <Button
              hoverIndicator="background"
              primary
              type="submit"
              alignSelf="center"
              label="Войти"
            />
          </Box>
          <Box direction="row" alignSelf="center" gap="small" align="center" />
        </Form>
        <Box>
          {this.props.loadingFetch ? (
            <Preloader />
          ) : this.props.isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <Text>{this.props.logRegstatusError}</Text>
          )}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    loadingFetch: store.loadingFetch,
    logRegstatusError: store.logRegstatusError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginFetch: data => dispatch(loginFetchAC(data)),
    clearStatus: () => dispatch(clearStatusAC()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
