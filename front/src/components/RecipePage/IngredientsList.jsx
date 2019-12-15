import React from "react";
import { connect } from "react-redux";

// import { logoutFetchAC } from '../../redux/actions/actions';

class Navbar extends React.Component {
  render() {
    return (
      <ul>
        <li>
            
        </li>
      </ul>
    );
  }
}

function mapStateToProps(store) {
  //   return {
  //     isLoggedIn: store.isLoggedIn,
  //   };
}

function mapDispatchToProps(dispatch) {
  //   return {
  //     logoutFetch: () => dispatch(logoutFetchAC()),
  //   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
