import React from 'react';
import { BrowserRouter as Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { registerFetchAC, clearStatusAC } from '../../redux/actions/actions';

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }
  handleLogin = (event) => {
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
  //проверка авторизации
  //   const response = await fetch("http://localhost:5000/api/registration", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password,
  //       email: this.state.email,
  //     })
  //   });
  //   if (response.status === 200) {
  //     let result = await response.json()
  //     console.log(result);
  //     this.setState({
  //       registrationStatus:result.registrationstatus
  //     })

  //   } else {
  //     console.log(`ERROR: ${response.status}`);
  //   }
  // }

  render() {
    return (
      <div className={"form-style-1"} >
        <form id='userRegister' onSubmit={this.handleSubmit}>
          <div className={"container"}>
            <h1>Registration</h1>
            <p>Please register yourself</p>
            <hr />
            <label><b>Username</b></label>
            <input type="text" placeholder="Username" name="username" required onChange={this.handleLogin} />
            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required onChange={this.handlePassword} />
            <label><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="emailRegistration" required onChange={this.handleEmail} />
            <hr />
            <button type="submit" className={"registerbtn"}>Register</button>
          </div>
        </form>
        <div>
          {this.props.logRegloadingFetch
            ? <span className={'statustext'}>loading</span>
            : this.props.logRegstatusError
              ? <span className={'statustext'}>{this.props.logRegstatusError}</span>
              :<span className={'statustext'}>{this.props.registrationStatus}</span> } 
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    logRegloadingFetch: store.logRegloadingFetch,
    logRegstatusError: store.logRegstatusError,
    registrationStatus: store.registrationStatus,
  }
}

// Без ActionCreator
// function mapDispatchToProps(dispatch) {
//   return {
//     addTodo: (taskName) => dispatch( {type: 'ADD_TODO', title: taskName} )
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    registerFetch: data => dispatch(registerFetchAC(data)),
    clearStatus: () => dispatch(clearStatusAC())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)