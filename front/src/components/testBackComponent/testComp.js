const fetch = require('node-fetch');

const link = 'http://localhost:5000';

async function getAll() {
  const response = await fetch(`${link}/api/recipes/`);
  const respJson = await response.json();
  console.log('respJsonReceived', respJson);
}

async function CreateOne(recipe) {
  const response = await fetch(`${link}/api/recipes/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  const respJson = await response.json();
  console.log('respJsonReceived', respJson);
}

const ingredOne = {
  name: 'Рис шлифованный длиннозерный, 500 гр',
  weight: 500,
  rating: '4.8',
  price: 53,
  currency: 'руб/шт',
  link: 'https://vkusvill.ru/goods/ris-shlifovannyy-dlinnozernyy-500-gr.html',
  imageLink: 'https://vkusvill.ru/upload/resize/114789/114789_530x300x85_c.jpg',
  calories: 321,
  weightAbsoulte: '500',
  measureType: 'г',
  pricePerKilo: 106,
  quantity: 1,
  caloriesTotal: 1605,
  priceTotal: 53,
  inputWeight: 170,
};

const ingredTwo = {
  name: 'Окунь филе на коже зам.',
  weight: 600,
  rating: '4.7',
  price: 367,
  currency: 'руб/кг',
  link: 'https://vkusvill.ru/goods/okun-file-na-kozhe-zam.html',
  imageLink: 'https://vkusvill.ru/upload/resize/115050/115050_530x300x85_c.jpg',
  calories: 99,
  weightAbsoulte: '600',
  measureType: 'г',
  pricePerKilo: 611,
  quantity: 1,
  caloriesTotal: 594,
  priceTotal: 367,
  inputWeight: 500,
};

const recipeOne = {
  name: 'Окунь с рисом',
  image: 'https://vkusvill.ru/upload/resize/94964/94964_530x300x85_c.jpg',
  instructions: [
    '1. Разморозить рыбу и долго долго смотреть какая это длинная строка',
    '2. Сварить рис',
    '3. Посыпать специями',
    '4. Жарить 30 минут',
    '5. Отделить филе от костей',
    '6. Подать с лимоном',
  ],
  priceTotal: 800,
  caloriesTotal: 1275,
  ingredients: [ingredOne, ingredTwo],
  portions: 5,
  author: '5df269b2cd6c2c3123d3def4',
  // author: req.session.userId
};

const recipeTwo = {
  name: 'Окунь с рисом',
  image: 'https://vkusvill.ru/upload/resize/94964/94964_530x300x85_c.jpg',
  instructions: [
    '1. Разморозить рыбу и долго долго смотреть какая это длинная строка',
    '2. Сварить рис',
    '3. Посыпать специями',
    '4. Жарить 30 минут',
    '5. Отделить филе от костей',
    '6. Подать с лимоном',
  ],
  priceTotal: 800,
  caloriesTotal: 1275,
  ingredients: [ingredOne, ingredTwo],
  portions: 5,
  author: '5df269b2cd6c2c3123d3def4',
  // author: req.session.userId
};

CreateOne(recipeOne);
// getAll()

async function getOneRecipebyId(recipeId) {
  const response = await fetch(`${link}/api/recipes/${recipeId}`);
  const respJson = await response.json();
  console.log('respJsonReceived', respJson);
}
const testId = '5df38fa342403c7b25a04d2d';
// getOneRecipebyId(testId);

async function deleteOneRecipebyId(recipeId) {
  const response = await fetch(`${link}/api/recipes/${recipeId}`, {
    method: 'DELETE',
  });
  const respJson = await response.json();
  console.log('respJsonReceived', respJson);
}
// getAll()
// deleteOneRecipebyId(testId);

async function EditOneRecipebyId(recipeId) {
  const response = await fetch(`${link}/api/recipes/${recipeId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '22 new Fish and chips',
      image: '22',
      instructions: '22change i',
      priceTotal: '22666',
      caloriesTotal: '22999',
      ingredients: ['222ingredOnenew', '222ingredTwonew'],
    }),
  });
  const respJson = await response.json();
  console.log('respJsonReceived', respJson);
}
// EditOneRecipebyId(testId);

async function getAlRecipesByUserId(userId) {
  const response = await fetch(`${link}/api/users/${userId}/recipes`);
  const respJson = await response.json();
  console.log('respJsonReceived', respJson);
}
// let testUserId = "5df269b2cd6c2c3123d3def4";
// getAlRecipesByUserId(testUserId);

async function ingredientParse(productname) {
  const response = await fetch(`${link}/api/parses/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ productname }),
  });
  const respJson = await response.json();
  console.log('respJsonReceived', respJson);
}
ingredientParse('рис');
