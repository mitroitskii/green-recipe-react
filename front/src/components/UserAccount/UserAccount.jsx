import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeItem from '../RecipeItem';
import { Link } from 'react-router-dom';

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

  deleteRecipe = async (id) => {
    const responce = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    });
    const respJson = await responce.json();
    await console.log(respJson);
    this.setState(({ recipes }) => {
      const idx = recipes.findIndex((el) => el._id === id);
      console.log(idx);
      const newRecipes = [...recipes]
      newRecipes.splice(idx, 1);
      return {
        recipes: newRecipes
      }
    });
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
                <Link to={'/recipes/' + item._id}><button>Редактировать</button></Link>
                <button onClick={() => this.deleteRecipe(item._id)}>Удалить</button>
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