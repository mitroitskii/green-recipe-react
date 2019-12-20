import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button, Text } from 'grommet';

export default class SortPanel extends Component {
  state = {
    directionCal: '',
    directionPrice: '',
    id: ''
  };

  componentDidMount() {
    this.randomRecipesFromApi();
  }

  randomRecipesFromApi = async () => {
    const recipeId = await fetch('/api/recipes/random');
    const respJson = await recipeId.json();
    this.setState({ id: respJson.id });
  };

  toggleCal = () => {
    switch (this.state.directionCal) {
      case 'up':
        this.setState({ directionCal: 'down', directionPrice: '' });
        break;
      case 'down':
        this.setState({ directionCal: 'up', directionPrice: '' });
        break;
      default:
        this.setState({ directionCal: 'up', directionPrice: '' });
    }
  };

  togglePrice = () => {
    switch (this.state.directionPrice) {
      case 'up':
        this.setState({ directionPrice: 'down', directionCal: '' });
        break;
      case 'down':
        this.setState({ directionPrice: 'up', directionCal: '' });
        break;
      default:
        this.setState({ directionPrice: 'up', directionCal: '' });
    }
  };

  render() {
    const {
      recipesFromApiSortingByPrice,
      recipesFromApiSortingByCalories
    } = this.props;
    const { directionCal, directionPrice, id } = this.state;
    const priceButton =
      directionPrice === 'up'
        ? 'По цене ▼'
        : directionPrice === 'down'
          ? 'По цене ▲'
          : 'По цене';
    const calorieButton =
      directionCal === 'up'
        ? 'По калорийности ▼'
        : directionCal === 'down'
          ? 'По калорийности ▲'
          : 'По калорийности';
    return (
      <Box width='large'>
        <Grid
          margin="xsmall"
          rows={['fit']}
          columns={['fit', 'fit', 'fit', 'fit']}
          gap="small"
          areas={[
            { name: 'surprise', start: [0, 0], end: [1, 0] },
            { name: 'sort', start: [1, 0], end: [2, 0] },
            { name: 'sortButton1', start: [2, 0], end: [3, 0] },
            { name: 'sortButton2', start: [3, 0], end: [4, 0] }
          ]}
        >
          <Box gridArea="surprise">
            <Link to={'/recipes/' + id}>
              <Button
                style={{ "border": "none" }}
                label="Удиви меня!" />
            </Link>
          </Box>
          <Box gridArea="sort">
            <Text margin="xsmall">Сортировать:</Text>
          </Box>
          <Box gridArea="sortButton1">
            <Button
              style={{ "border": "none" }}
              label={priceButton}
              onClick={() => {
                recipesFromApiSortingByPrice(directionPrice);
                this.togglePrice();
              }}
            />
          </Box>
          <Box gridArea="sortButton2">
            <Button
              style={{ "border": "none" }}
              label={calorieButton}
              onClick={() => {
                recipesFromApiSortingByCalories(directionCal);
                this.toggleCal();
              }}
            />
          </Box>
        </Grid>
      </Box>
    );
  }
}
