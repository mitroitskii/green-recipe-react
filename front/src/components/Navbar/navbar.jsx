import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutFetchAC } from '../../redux/actions/actions';

class Navbar extends React.Component {
  async logout() {
    // logout на сервер
    this.props.logoutFetch();
  }

  render() {
    if (this.props.isLoggedIn) {
      console.log(this.props);
      console.log((this.props.isLoggedIn));
      return (
        <header role="banner">
          <nav className={'navbar'}>
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/login" onClick={this.logout.bind(this)}>
                  LOGOUT
                </Link>
              </li>
              <li>
                <Link to={'/users/' + this.props.userId}>{this.props.userName}</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    }
    return (
      <header role="banner">
        <div>
          <nav className={'navbar'}>
            <ul>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
              <li>
                <Link to="/registration">REGISTRATION</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    userId: store.userId,
    userName: store.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutFetch: () => dispatch(logoutFetchAC()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

// const response = await fetch("http://localhost:5000/api/logout", { method: 'DELETE',
// credentials: "include"})
// if (response.status === 200) {
//   let result = await response.json()
//   let isLoggedIn = result.isLoggedIn
//   console.log(result);
//   this.props.sessionChecker(isLoggedIn)
// } else {
//   console.log(`ERROR: ${response.status}`);
// }
