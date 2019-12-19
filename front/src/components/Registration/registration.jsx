import React from 'react';
import { BrowserRouter as Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { registerFetchAC, clearStatusAC } from '../../redux/actions/actions';


import { Box, Text, Button, Heading } from 'grommet';
import { Form, TextInputField, PasswordInputField, EmailInputField, validators } from 'grommet-controls';
import Preloader from "../Preloader/preloader"


class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  handleSubmit = async (values) => {
    // event.preventDefault();
    this.props.registerFetch({
      username: values.username,
      password: values.password,
      email: values.email,
    })
  }

  componentWillUnmount() {
    this.props.clearStatus()
  }

  render() {
    return (
      <Box width="30%" margin="large" pad="large" border={{"color":"border"}} background="light-1" >
        <Heading level="2">Регистрация</Heading>
        <Form
          basis='medium'
          focusFirstChild={false}
          onSubmit={this.handleSubmit}
        >
          <TextInputField label='Имя' name='username' />
          <PasswordInputField
            label='Пароль'
            name='password'
            validation={
              [validators.required(), validators.minLength(5), validators.alphaNumeric()]
            }
          />
          <EmailInputField label='Email' name='email' validation={[validators.required(), validators.email()]} />
          <Box pad={{ vertical: 'medium' }} align='end'>
            <Button hoverIndicator='background' primary={true} type='submit' label='Зарегистрироваться' />
          </Box>
        </Form >
        <Box>
          {this.props.loadingFetch
            ? <Preloader/>
            : this.props.logRegstatusError
              ? <Text className={'statustext'}>{this.props.logRegstatusError}</Text>
              : <Text className={'statustext'}>{this.props.registrationStatus}</Text>
          }
        </Box>
      </Box>
    )
  }
}

function mapStateToProps(store) {
  return {
    loadingFetch: store.loadingFetch,
    logRegstatusError: store.logRegstatusError,
    registrationStatus: store.registrationStatus,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerFetch: data => dispatch(registerFetchAC(data)),
    clearStatus: () => dispatch(clearStatusAC())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)

///Форма по Grommet.Почему-то не вводится текст

//< Form
// basis = 'medium'
// focusFirstChild = { false}
// onSubmit = { this.handleSubmit }
//>
  //   <TextInputField label='Username' name='username' onChange={this.handleLogin} />
  //   <EmailInputField label='Email' name='email' validation={[validators.required(), validators.email()]} onChange={this.handlePassword} />
  //   <PasswordInputField
  //     label='Password'
  //     name='password'
  //     validation={
  //       [validators.required(), validators.minLength(5), validators.alphaNumeric()]
  //     }
  //     onChange={this.handleEmail}
  //   />
  //   <Box pad={{ vertical: 'medium' }} align='end'>
  //     <Button hoverIndicator='background' primary={true} type='submit' label='Save profile' />
  //   </Box>
//</Form >

