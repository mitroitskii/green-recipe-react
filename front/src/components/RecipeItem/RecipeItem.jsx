import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

const RecipeItem = (item) => {
  const { name, image, _id, ingredients, priceTotal, caloriesTotal } = item;
  // вернуть инструкции по желанию
  return (
    <div>
      <img src={image} alt={name}></img>
      <Link to={'/recipes/' + _id}>{name}</Link>
      <p>Количество ингредиентов: {ingredients.length}</p>
      <p>Стоимость рецепта: {priceTotal} руб. </p>
      <p>Калорийность: {caloriesTotal} ккал </p>
    </div>
  );
}


export default RecipeItem;