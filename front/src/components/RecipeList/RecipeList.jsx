import React, { Component } from 'react';
import RecipeItem from '../RecipeItem';
import SortPanel from '../SortPanel';
import CategorySelector from '../CategorySelector';
import { Heading, Box, Text } from 'grommet';
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
      <Box >
        <Heading margin='large' textAlign='center'>Рецепты</Heading>
        <Text margin='large' textAlign='center'>
          Ищите рецепты, выбирая категорию блюда.
          Рецепты можно отсортировать по цене и калорийности.
          А чтобы не страдать от мук выбора, воспользуйтесь функцией "Удиви меня!": )
          </Text>
        <Box justify='center' align='center'>
          <SortPanel
            recipesFromApiSortingByPrice={this.recipesFromApiSortingByPrice}
            recipesFromApiSortingByCalories={this.recipesFromApiSortingByCalories}
          />
        </Box>
        <Box justify='center' align='center'>
          <CategorySelector
            recipesCategory={this.recipesCategory}
            recipesFromApi={this.recipesFromApi}
          />
        </Box>
        <Box justify="center" alignSelf="center">
          {recipes.map((item) => {
            return (
              <Box key={item._id} align="start" style={{ "margin-top": "40px" }}>
                <RecipeItem {...item} />
              </Box>
            )
          })
          }
        </Box>
      </Box>
    )
  }
}
