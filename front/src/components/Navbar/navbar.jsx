import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.css'
import { Box, Anchor, Header, Image, Button, Paragraph } from 'grommet';
import { logoutFetchAC } from '../../redux/actions/actions';
import logo from './logo.png'

class Navbar extends React.Component {
  async logout() {
    // logout на сервер
    this.props.logoutFetch();
  }

  fakehandleClick() {

  }

  render() {
    return (
      <Header direction="row" width="80%" align="center" justify="center" height="60px" elevation="medium">
        <Box direction="row" align="center" justify="center" height="100%" width="auto">
          <Box align="center" justify="center"
            height="100%" width="11%"
          >
            <Image src={logo} height="100%" width="100%" fill="true" />
          </Box>
          <Box align="center" justify="center"
            height="100%" width="12%"
            onClick={this.fakehandleClick}
            hoverIndicator
          >
            <Button as={Link} to="/"
              align="center" justify="center"
              fill="true"
              onClick={this.fakehandleClick}
              focusIndicator="false"
            >
              <Paragraph fill="true" textAlign="center">ГЛАВНАЯ</Paragraph>
            </Button>
          </Box>
          {this.props.isLoggedIn ? (
            <>
              <Box align="center" justify="center"
                height="100%" width="19%"
                onClick={this.fakehandleClick}
                hoverIndicator
              >
                <Button as={Link} to={`/recipes/:id`${}}
                  align="center" justify="center"
                  fill="true"
                  onClick={this.fakehandleClick}
                  focusIndicator="false"
                >
                  <Paragraph fill="true" textAlign="center">МОИ РЕЦЕПТЫ</Paragraph>
                </Button>
              </Box>
              <Box align="center" justify="center"
                height="100%" width="21%"
                onClick={this.fakehandleClick}
                hoverIndicator
              >
                <Button as={Link} to="/recipes/new"
                  align="center" justify="center"
                  onClick={this.fakehandleClick} focusIndicator="false"
                  fill="true">
                  <Paragraph fill="true" textAlign="center">СОЗДАТЬ РЕЦЕПТ</Paragraph>
                </Button>
              </Box>
              <Box align="center" justify="center"
                height="100%"
                width="10%"
                onClick={this.fakehandleClick}
                hoverIndicator>
                <Button as={Link} to="/" align="center" justify="center" onClick={this.logout.bind(this)} focusIndicator="false" fill="true">
                  <Paragraph fill="true" textAlign="center">ВЫЙТИ</Paragraph>
                </Button>
              </Box>
            </>
          ) : (
              <>
                <Box align="center" justify="center"
                  height="100%" width="10%"
                  onClick={this.fakehandleClick}
                  hoverIndicator
                >
                  <Button as={Link} to="/login" align="center" justify="center"
                    onClick={this.fakehandleClick}
                    focusIndicator="false"
                    fill="true"
                  >
                    <Paragraph fill="true" textAlign="center">
                      ВОЙТИ
                    </Paragraph>
                  </Button>
                </Box>
                <Box align="center" justify="center"
                  height="100%" width="18%"
                  onClick={this.fakehandleClick} 
                  hoverIndicator
                >
                  <Button as={Link} to="/registration" align="center" justify="center"
                    onClick={this.fakehandleClick}
                    focusIndicator="false"
                    fill="true"
                    hoverIndicator
                  >
                    <Paragraph fill="true" textAlign="center">
                      РЕГИСТРАЦИЯ
                    </Paragraph>
                  </Button>
                </Box>
              </>
            )}
        </Box>
      </Header>
    );
  }
}
function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    userId: store.userId,
    userName: store.userName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutFetch: () => dispatch(logoutFetchAC())
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
