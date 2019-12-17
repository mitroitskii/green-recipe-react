import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeItem from '../RecipeItem';

class UserAccount extends Component {

  state = {
    recipes: []
  }

  componentDidMount() {
    this.recipesFromApi();
  }

  recipesFromApi = async () => {
    const recipes = await fetch(`/api/users/${this.props.userId}/recipes`);
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  }

  render() {
    const { recipes } = this.state;

    return (
      <>
        <ul>
          {recipes.map((item) => {
            return (
              <li key={item._id}>
                <RecipeItem {...item} />
              </li>
            )
          })
          }
        </ul>
      </>
    )
  }
}

function mapStateToProps(store) {
  return {
    userId: store.userId,
    userName: store.userName
  };
}

export default connect(mapStateToProps)(UserAccount)