import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Text } from 'grommet';


export default class SortPanel extends Component {
  state = {
    directionCal: '',
    directionPrice: '',
    id: ''
  }

  componentDidMount() {
    this.randomRecipesFromApi();
  }

  randomRecipesFromApi = async () => {
    const recipeId = await fetch('/api/recipes/random');
    const respJson = await recipeId.json();
    this.setState({ id: respJson.id });
  }

  toggleCal = () => {
    switch (this.state.directionCal) {
      case 'up': this.setState({ directionCal: 'down', directionPrice: '' });
        break;
      case 'down': this.setState({ directionCal: 'up', directionPrice: '' });
        break;
      default: this.setState({ directionCal: 'up', directionPrice: '' })
    }
  }

  togglePrice = () => {
    switch (this.state.directionPrice) {
      case 'up': this.setState({ directionPrice: 'down', directionCal: '' });
        break;
      case 'down': this.setState({ directionPrice: 'up', directionCal: '' });
        break;
      default: this.setState({ directionPrice: 'up', directionCal: '' })
    }
  }

  render() {
    const { recipesFromApiSortingByPrice, recipesFromApiSortingByCalories } = this.props;
    const { directionCal, directionPrice, id } = this.state;
    const priceButton = (directionPrice === 'up') ? 'По цене ▼' : (directionPrice === 'down') ? 'По цене ▲' : 'По цене';
    const calorieButton = (directionCal === 'up') ? 'По калорийности ▼' : (directionCal === 'down') ? 'По калорийности ▲' : 'По калорийности';
    return (
      <Box>
        <Link to={'/recipes/' + id}><Button label='Удиви меня!' /></Link>
        <Text>Сортировать:</Text>
        <Button label={priceButton} onClick={() => { recipesFromApiSortingByPrice(directionPrice); this.togglePrice() }} />
        <Button label={calorieButton} onClick={() => { recipesFromApiSortingByCalories(directionCal); this.toggleCal() }} />
      </Box>
    );
  }
}