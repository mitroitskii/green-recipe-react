import React from 'react';
import RecipeList from '../RecipeList';
import IngredientSlider from '../RecipeForm/Slider/Slider';

export default function Home() {
  return (
    <div className="Home">
      {/* <RecipeList /> */}
      <IngredientSlider/>
    </div>
  )
}

