import React from 'react';
import RecipeItem from '../RecipeItem';


const RecipeList = (recipes) => {
  const elements = recipes.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <RecipeItem {...itemProps}
        />
      </li>)
  })
  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
}

export default RecipeList;