import React, { Component } from 'react';
import RecipeItem from '../RecipeItem';
import SortPanel from '../SortPanel';
import CategorySelector from '../CategorySelector';
import { Box } from 'grommet';
import './recipe-list.css'

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
    const recipes = await fetch(`/api/recipes/price?direction=${direction}`);
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  }

  recipesFromApiSortingByCalories = async (direction) => {
    const recipes = await fetch(`/api/recipes/calorific?direction=${direction}`);
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  }

  recipesCategory = async (category) => {
    const recipes = await fetch(`/api/recipes/category/${category}`);
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  }

  render() {
    const { recipes } = this.state;

    return (
      <Box width='large'>
        <SortPanel
          recipesFromApiSortingByPrice={this.recipesFromApiSortingByPrice}
          recipesFromApiSortingByCalories={this.recipesFromApiSortingByCalories}
        />
        <CategorySelector
          recipesCategory={this.recipesCategory}
          recipesFromApi={this.recipesFromApi}
        />
        {recipes.map((item) => {
          return (
            <Box key={item._id}>
              <RecipeItem {...item} />
            </Box>
          )
        })
        }
      </Box>
    )
  }
}
