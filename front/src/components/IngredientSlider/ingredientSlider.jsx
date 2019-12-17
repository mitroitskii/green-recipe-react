import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import IngredientCard from '../IngredientCard/ingredientCard';

export default class IngredientSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      activeItemIndex: 0,
    }
  }
  async componentDidMount() {
    let search = 'рис'
    const response = await fetch(`http://localhost:5000/api/parses/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ productname :search }),
    });
    if (response.status === 200) {
      const ingredients = await response.json();
      console.log(ingredients);
      this.setState({children: ingredients.ingredients})
      console.log(this.state.children);
      
    } else {
      console.log(`ERROR: ${response.status}`);
    }
  }
  render() {
    return (
      <div style={{ "padding": "0 60px", maxWidth: "1614px", "margin": "0 auto" }}>
        <ItemsCarousel
          infiniteLoop={false}
          gutter={12}
          activePosition={'center'}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={3}
          slidesToScroll={1}
          outsideChevron={true}
          showSlither={false}
          firstAndLastGutter={false}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={value => this.setState({ activeItemIndex: value })}
          rightChevron={'>'}
          leftChevron={'<'}
        >
          {this.state.children.map((elem, i) => { return <IngredientCard key={i} ingredients={this.props.ingredients} ingredient={elem} setIngredients={this.props.setIngredients} /> })}
        </ItemsCarousel>
      </div>
    )
  }
}
