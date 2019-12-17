import React from 'react';

const RecipeItem = (item) => {
  const { name, image, _id, instructions, priceTotal, caloriesTotal } = item;
  return (
    <div>
      <img src={image} alt={name} ></img>
      <a href={'/recipes/' + _id}>{name} </a>
      {/* <p>Рецепт: {instructions.substr(0, 50) + '...'}</p> */}
      <p>Стоимость рецепта: {priceTotal} </p>
      <p>Каллорийность: {caloriesTotal}</p>
    </div>
  );
}


export default RecipeItem;