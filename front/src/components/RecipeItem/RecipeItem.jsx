import React from 'react';

const RecipeItem = (item) => {
  const { recipeName, recipeImg, recipeID, recipeCost, recipeWeight, recipeCalorificValue } = item;
  return (
    <div>
      <img src={recipeImg} alt={recipeName} ></img>
      <Link to={'/recipe/' + recipeID}> recipeName </Link>
      <p>Стоимость рецепта: {recipeCost} </p>
      <p>Вес: {recipeWeight} </p>
      <p>Каллорийность: {recipeCalorificValue}</p>
    </div>
  );
}


export default RecipeItem;