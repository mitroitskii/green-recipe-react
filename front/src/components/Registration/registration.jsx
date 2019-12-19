import React from 'react';
import { BrowserRouter as Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { registerFetchAC, clearStatusAC } from '../../redux/actions/actions';


import { Box, Text, Button, FormField } from 'grommet';
import { Form, TextInputField, PasswordInputField, EmailInputField, validators } from 'grommet-controls';
import FormFieldLabel from '../FormFieldwithRequiredLabel/formFieldWithRequiredLabel'



class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }
  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.registerFetch({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    })
  }

  componentWillUnmount() {
    this.props.clearStatus()
  }

  render() {
    return (
      <Box align="center" pad="large">
//       <Form>
//         <FormFieldLabel name="firstName" label="FirstName" required />
//         <FormFieldLabel name="LastName" label="LastName" required />
//         <FormFieldLabel name="email" label="Email" />
//         <Button type="submit" label="Submit" primary />
//         <Text margin={{ left: "small" }} size="small" color="status-critical">
//           * Required Field
//         </Text>
//       </Form>
//     </Box>
      // <div className={"form-style-1"} >
      //   <form id='userRegister' onSubmit={this.handleSubmit}>
      //     <div className={"container"}>
      //       <h1>Registration</h1>
      //       <p>Please register yourself</p>
      //       <hr />
      //       <label><b>Username</b></label>
      //       <input type="text" placeholder="Username" name="username" required onChange={this.handleUsername} />
      //       <label><b>Password</b></label>
      //       <input type="password" placeholder="Enter Password" name="password" required onChange={this.handlePassword} />
      //       <label><b>Email</b></label>
      //       <input type="email" placeholder="Enter Email" name="emailRegistration" required onChange={this.handleEmail} />
      //       <hr />
      //       <button type="submit" className={"registerbtn"}>Register</button>
      //     </div>
      //   </form>
      //   <div>
      //     {this.props.loadingFetch
      //       ? <span className={'statustext'}>loading</span>
      //       : this.props.logRegstatusError
      //         ? <span className={'statustext'}>{this.props.logRegstatusError}</span>
      //         : <span className={'statustext'}>{this.props.registrationStatus}</span>}
      //   </div>
      // </div>
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

{/* < Form
basis = 'medium'
focusFirstChild = { false}
onSubmit = { this.handleSubmit }
>
    <FormField label='Username' name='username' onChange={this.handleLogin} />
    <EmailField label='Email' name='email' validation={[validators.required(), validators.email()]} onChange={this.handlePassword} />
    <PasswordField
      label='Password'
      name='password'
      validation={
        [validators.required(), validators.minLength(5), validators.alphaNumeric()]
      }
      onChange={this.handleEmail}
    />
    <Box pad={{ vertical: 'medium' }} align='end'>
      <Button hoverIndicator='background' primary={true} type='submit' label='Save profile' />
    </Box>
</Form > */}

// const FormFieldLabel = props => {
//   const { required, label, ...rest } = props;
//   return (
//     <FormField
//       label={
//         required ? (
//           <Box direction="row">
//             <Text>{label}</Text>
//             <Text color="status-critical">*</Text>
//           </Box>
//         ) : (
//           label
//         )
//       }
//       required={required}
//       {...rest}
//     />
//   );
// };

// const LabelFormField = () => (
//   <Grommet theme={grommet}>
//     <Box align="center" pad="large">
//       <Form>
//         <FormFieldLabel name="firstName" label="FirstName" required />
//         <FormFieldLabel name="LastName" label="LastName" required />
//         <FormFieldLabel name="email" label="Email" />
//         <Button type="submit" label="Submit" primary />
//         <Text margin={{ left: "small" }} size="small" color="status-critical">
//           * Required Field
//         </Text>
//       </Form>
//     </Box>
//   </Grommet>
// );