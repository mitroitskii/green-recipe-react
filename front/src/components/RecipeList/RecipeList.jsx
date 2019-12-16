import React, { Component } from 'react';
import RecipeItem from '../RecipeItem';

export default class RecipeList extends Component {

  state = {
    recipes: []
  }

  componentDidMount() {
    this.recipesFromApi();
  }

  recipesFromApi = async () => {
    const recipes = await fetch('/api/recipes');
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  }

  render() {
    const { recipes } = this.state;

    return (
      <ul>
        {recipes.map((item) => {
          return (
            <li key={item.id}>
              <RecipeItem {...item} />
            </li>
          )
        })
        }
      </ul>
    )
  }
}
