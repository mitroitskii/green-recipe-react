import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { isLoggedFetchAC } from '../../redux/actions/actions';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: true,
    };
  }

  async componentDidMount() {
    // проверка авторизации
    this.props.isLoggedFetch();
  }

  render() {
    const Component = this.props.Component;
    return (
      <Route
        {...this.props}
        render={props =>
          (this.props.isLoggedIn
            ? (<Component {...props} />)
            : this.props.loadingFetch
              ? (<span className={'statustext'}>loading</span>)
              : (<Redirect to="/login" />)
          )
        }
      />
    );
  }
}
function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    loadingFetch: store.loadingFetch,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    isLoggedFetch: () => dispatch(isLoggedFetchAC()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
