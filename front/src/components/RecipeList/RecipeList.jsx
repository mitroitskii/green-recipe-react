import React from 'react';
import RecipeItem from '../RecipeItem';


const RecipeList = () => {
  const recipesFromApi = async () => {
    const recipes = await fetch('/api/recipes');
    recipes = await recipes.json()
    return recipes;
  }
  const recipesForList = recipesFromApi();
  console.log(recipesForList);

  // const eda = [
  //   {
  //     id: '12423542342',
  //     name: 'Пельмешки',
  //     image: 'https://img1.russianfood.com/dycontent/images_upl/53/sm_52955.jpg',
  //     instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu semper risus. Aenean tempus metus sed dolor condimentum varius. Pellentesque mi lacus, consequat ac suscipit non, sagittis eget nisi. Pellentesque consequat egestas purus, at sodales elit sollicitudin a. Nam vel leo diam. Morbi in orci vel leo egestas ultricies non.',
  //     priceTotal: '250 руб',
  //     caloriesTotal: '450 ккал',
  //     ingredients: [],
  //     author: {},
  //   },
  //   {
  //     id: '312412351345234',
  //     name: 'Гречка с мясом',
  //     image: 'https://img1.russianfood.com/dycontent/images_upl/376/sm_375300.jpg',
  //     instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at posuere sem. In nulla tortor, semper eget dui quis, tristique iaculis mauris. Nunc eu vestibulum justo, eu volutpat arcu. Nullam in nisl non diam molestie porttitor vel in ex. Quisque viverra purus non ante commodo, quis fringilla ligula dapibus. Suspendisse',
  //     priceTotal: '150 руб',
  //     caloriesTotal: '500 ккал',
  //     ingredients: [],
  //     author: {},
  //   },
  // ]

  const elements = recipesForList.map((item) => {
    const { id } = item;
    return (
      <li key={id} className="list-group-item">
        <RecipeItem {...item}
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