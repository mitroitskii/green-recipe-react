import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import IngredientCard from '../IngredientCard/ingredientCard';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      activeItemIndex: 0,
    }
  }
componentDidMount() {
  // const response = await fetch("http://localhost:5000/api/", {
  //   credentials: "include"
  // })
  // if (response.status === 200) {
  //   let result = await response.json()
  //   let isLoggedIn = result.isLoggedIn
  //   this.props.sessionChecker(isLoggedIn)
  //   this.setState({
  //     isLoggedIn,
  //     loading: false
  //   })
  //   // if (isLoggedIn !== true) {
  //   //   this.props.history.push('/login')
  //   // }
  // } else {
  //   console.log(`ERROR: ${response.status}`);
  // }
}
  render() {
    return (
      <div style={{ "padding": "0 60px", maxWidth:"1614px", "margin": "0 auto" }}>
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
          {this.state.children.map((elem, i) => { return <IngredientCard key={i} ingredient={elem} /> })}
        </ItemsCarousel>
      </div>
    )
  }
}
