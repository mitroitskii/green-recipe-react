import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
      case 'down': this.setState({ direcdirectionPricetionCal: 'up', directionCal: '' });
        break;
      default: this.setState({ directionPrice: 'up', directionCal: '' })
    }
  }

  render() {
    const { recipesFromApiSortingByPrice, recipesFromApiSortingByCalories } = this.props;
    const { directionCal, directionPrice, id } = this.state
    return (
      <div>
        <Link to={'/recipes/' + id}><button>Удиви меня!</button></Link>
        <span>Сортировать:</span>
        <button onClick={() => { recipesFromApiSortingByPrice(directionPrice); this.togglePrice() }}>
          По цене {(directionPrice === 'up') && '▼'} {(directionPrice === 'down') && '▲'}
        </button>
        <button onClick={() => { recipesFromApiSortingByCalories(directionCal); this.toggleCal() }}>
          По калорийности {(directionCal === 'up') && '▼'} {(directionCal === 'down') && '▲'}
        </button>
      </div >
    );
  }
}