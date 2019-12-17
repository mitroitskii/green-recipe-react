import React, { Component } from 'react';

export default class SortPanel extends Component {
  state = {
    directionCal: '',
    directionPrice: ''
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
    const { directionCal, directionPrice } = this.state
    return (
      <div>
        <button>Удиви меня!</button>
        <span>Сортировать:</span>
        <button onClick={() => { recipesFromApiSortingByPrice(directionPrice); this.togglePrice() }}>
          По цене {(directionPrice === 'up') && '▲'} {(directionPrice === 'down') && '▼'}
        </button>
        <button onClick={() => { recipesFromApiSortingByCalories(directionCal); this.toggleCal() }}>
          По каллорийности {(directionCal === 'up') && '▲'} {(directionCal === 'down') && '▼'}
        </button>
      </div>
    );
  }
}