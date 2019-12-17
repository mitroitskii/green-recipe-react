import React from 'react';
<<<<<<< HEAD
import ItemsCarousel from 'react-items-carousel';
import IngredientSlider from '../IngredientSlider/ingredientSlider';

=======
import RecipeList from '../RecipeList';


function Home() {
  return (
    <div className="Home">
      <RecipeList />
    </div>
  )
}
>>>>>>> develop

export default class Home extends React.Component {

  render() {
    return (
      <IngredientSlider/>
    )
  }
}
