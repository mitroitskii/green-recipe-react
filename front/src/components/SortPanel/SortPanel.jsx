import React, { Component } from 'react';

export default class SortPanel extends Component {
  state = {
    direction: 'up'
  }

  toggle = () => {
    switch (this.state.direction) {
      case 'up': this.setState({ direction: 'down' });
        break;
      case 'down': this.setState({ direction: 'up' });
        break;
    }
  }

  render() {
    const { recipesFromApiSortingByPrice, recipesFromApiSortingByCalories } = this.props;
    const { direction } = this.state
    return (
      <div>
        <button>Удиви меня!</button>
        <span>Сортировать:</span>
        <button onClick={() => { recipesFromApiSortingByPrice(direction); this.toggle() }}>
          По цене {(direction === 'up') && '▲'} {(direction === 'down') && '▼'}
        </button>
        <button onClick={() => { recipesFromApiSortingByCalories(direction); this.toggle() }}>
          По каллорийности {(direction === 'up') && '▲'} {(direction === 'down') && '▼'}
        </button>
      </div>
    );
  }
}