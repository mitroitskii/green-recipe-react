import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import IngredientCard from '../IngredientCard/ingredientCard';

export default class IngredientSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
    };
  }
  async componentDidMount() {
    const search = 'рис';
    const response = await fetch('http://localhost:5000\'/api/parses/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ search }),
    });
    const ingredients = await response.json();
    console.log('respJsonReceived', ingredients);
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
          rightChevron={'>'}
          leftChevron={'<'}
        >
          {this.state.children.map((elem, i) => <IngredientCard key={i} ingredient={elem} />)}
        </ItemsCarousel>
      </div>
    );
  }
}
