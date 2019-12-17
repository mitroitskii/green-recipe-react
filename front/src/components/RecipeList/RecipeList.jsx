import React, { Component } from 'react';
import RecipeItem from '../RecipeItem';
import SortPanel from '../SortPanel';

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

  recipesFromApiSortingByPrice = async (direction) => {
    console.log("Сортировка по цене");
    const recipes = await fetch(`/api/recipes/price?direction=${direction}`);
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  }

  recipesFromApiSortingByCalories = async (direction) => {
    console.log("Сортировка по каллориям");
    const recipes = await fetch(`/api/recipes/calorific?direction=${direction}`);
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  }

  render() {
    const { recipes } = this.state;

    return (
      <>
        <SortPanel
          recipesFromApiSortingByPrice={this.recipesFromApiSortingByPrice}
          recipesFromApiSortingByCalories={this.recipesFromApiSortingByCalories}
        />
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
