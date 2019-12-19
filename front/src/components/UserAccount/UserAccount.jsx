import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeItem from '../RecipeItem';
import { Link } from 'react-router-dom';
import { Box, Button, Text } from 'grommet';

class UserAccount extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    this.recipesFromApi();
  }

  recipesFromApi = async () => {
    const recipes = await fetch(`/api/users/${this.props.userId}/recipes`);
    const respJson = await recipes.json();
    this.setState({ recipes: respJson.recipes });
  };

  deleteRecipe = async id => {
    const responce = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE'
    });
    const respJson = await responce.json();
    await console.log(respJson);
    this.setState(({ recipes }) => {
      const idx = recipes.findIndex(el => el._id === id);
      console.log(idx);
      const newRecipes = [...recipes];
      newRecipes.splice(idx, 1);
      return {
        recipes: newRecipes
      };
    });
  };

  render() {
    const { recipes } = this.state;

    return (
      <Box>
        {recipes.length === 0 &&
          <Box margin="small" justify="center" align="center">
            <Text> У вас нет рецептов </Text>
            <Text> Добавьте свой рецепт по этой <Link to={'/recipes/new'}>  ссылке </Link></Text>
          </Box>}
        {recipes.map(item => {
          return (
            <Box key={item._id} direction="column" justify="center" align="center">
              <RecipeItem {...item} />
              <Box direction="row" align='start'>
                <Link to={'/recipes/' + item._id + '/edit'}>
                  <Button label="Редактировать" margin="xsmall" />
                </Link>
                <Button
                  label="Удалить"
                  margin="xsmall"
                  onClick={() => this.deleteRecipe(item._id)}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  }
}

function mapStateToProps(store) {
  return {
    userId: store.userId,
    userName: store.userName
  };
}

export default connect(mapStateToProps)(UserAccount);
