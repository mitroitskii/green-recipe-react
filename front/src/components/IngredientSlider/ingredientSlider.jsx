import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import IngredientCard from '../IngredientCard/ingredientCard';
import { Button } from 'grommet';
import { CaretNext, CaretPrevious } from 'grommet-icons';

export default class IngredientSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      activeItemIndex: 0
    };
  }
  async componentDidMount() {
    try {
      const search = this.props.search;
      const response = await fetch('http://localhost:5000/api/parses/', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ productname: search })
      });
      if (response.status === 200) {
        const ingredients = await response.json();
        this.setState({ children: ingredients.ingredients });
      } else {
        console.log(`ERROR: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const search = this.props.search;
      console.log(search);
      const response = await fetch('http://localhost:5000/api/parses/', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ productname: search })
      });
      if (response.status === 200) {
        const ingredients = await response.json();
        console.log(ingredients);
        this.setState({ children: ingredients.ingredients });
        console.log(this.state.children);
      } else {
        console.log(`ERROR: ${response.status}`);
      }
    }
  }

  render() {
    return (
      <div style={{ padding: '0 60px', maxWidth: '1614px', margin: '0 auto' }}>
        <ItemsCarousel
          infiniteLoop={false}
          gutter={12}
          activePosition={'center'}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={3}
          slidesToScroll={1}
          outsideChevron
          showSlither={false}
          firstAndLastGutter={false}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={value =>
            this.setState({ activeItemIndex: value })
          }
          rightChevron={<Button icon={<CaretNext size="large" />} />}
          leftChevron={<Button icon={<CaretPrevious size="large" />} />}
        >
          {this.state.children.map(ingredient => (
            <IngredientCard
              key={ingredient.id}
              ingredients={this.props.ingredients}
              ingredient={ingredient}
              setIngredients={this.props.setIngredients}
            />
          ))}
        </ItemsCarousel>
      </div>
    );
  }
}
