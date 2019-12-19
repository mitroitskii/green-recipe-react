import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Anchor, Header } from 'grommet';
import { logoutFetchAC } from '../../redux/actions/actions';

class Navbar extends React.Component {
  async logout() {
    // logout на сервер
    this.props.logoutFetch();
  }

  render() {
    return (
      <Header width="80%" align="center" justify="center" gap="medium">
        {/* <Link to='/'>HOME</Link> */}
        <Box align="center" justify="center">
          <Anchor as={Link} to="/" label="Домашняя страница" />
        </Box>
        {this.props.isLoggedIn ? (
          <Box direction="row" align="center" justify="center" gap="medium">
            <Anchor
              label="Мои рецепты"
              as={Link}
              to={`/users/${this.props.userId}`}
            />
            <Anchor
              label="Создать рецепт"
              as={Link}
              to="/recipes/new"
            />
            <Anchor
              label="Выйти"
              as={Link}
              to="/login"
              onClick={this.logout.bind(this)}
            />
          </Box>
        ) : (
          <Box direction="row" justify="center" align="center" gap="medium">
            <Anchor label="Войти" as={Link} to="/login" />
            <Anchor label="Регистрация" as={Link} to="/registration" />
          </Box>
        )}
      </Header>
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

// const response = await fetch("http://localhost:5000/api/logout", {method: 'DELETE',
// credentials: "include"})
// if (response.status === 200) {
//   let result = await response.json()
//   let isLoggedIn = result.isLoggedIn
//   console.log(result);
//   this.props.sessionChecker(isLoggedIn)
// } else {
//   console.log(`ERROR: ${response.status}`);
// }
