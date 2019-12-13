const fetch = require("node-fetch");
link = "http://localhost:5000";

async function getAll() {
  const response = await fetch(link + "/api/recipes/");
  let respJson = await response.json();
  console.log("respJsonReceived", respJson);
}

async function CreateOne(recipe) {
  const response = await fetch(link + "/api/recipes/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(recipe)
  });
  let respJson = await response.json();
  console.log("respJsonReceived", respJson);
}

let ingredOne = {
  name: "Рис шлифованный длиннозерный, 500 гр",
  weight: "500",
  rating: "4.8",
  price: "53",
  currency: "руб/шт",
  link: "https://vkusvill.ru/goods/ris-shlifovannyy-dlinnozernyy-500-gr.html",
  kcal: "321",
  weightAbsoulte: "500",
  measureType: "г",
  pricePerKilo: 106
};

let ingredTwo = {
  name: "Рис  длиннозерный, 250 гр",
  weight: "600",
  rating: "4.2",
  price: "65",
  currency: "руб/шт",
  link: "https://vkusvill.ru/goods/ris-shlifovannyy-dlinnozernyy-500-gr.html",
  kcal: "250",
  weightAbsoulte: "250",
  measureType: "г",
  pricePerKilo: 260
};

let recipeOne = {
  name: "beef with veggies",
  image: "",
  instructions: "instrructions1",
  priceTotal: "500",
  caloriesTotal: "800",
  ingredients: [ingredOne, ingredTwo],
  author: "5df269b2cd6c2c3123d3def4"
  // author: req.session.userId
};

let recipeTwo = {
  name: "Fisn and chips",
  image: "",
  instructions: "instrructions2",
  priceTotal: "600",
  caloriesTotal: "900",
  ingredients: [ingredOne, ingredTwo],
  author: "5df269b2cd6c2c3123d3def4"
  // author: req.session.userId
};

// CreateOne(recipeOne);
// getAll()

async function getOneRecipebyId(recipeId) {
  const response = await fetch(link + "/api/recipes/" + recipeId);
  let respJson = await response.json();
  console.log("respJsonReceived", respJson);
}
let testId = "5df38fa342403c7b25a04d2d";
// getOneRecipebyId(testId);

async function deleteOneRecipebyId(recipeId) {
  const response = await fetch(link + "/api/recipes/" + recipeId, {
    method: "DELETE"
  });
  let respJson = await response.json();
  console.log("respJsonReceived", respJson);
}
// getAll()
// deleteOneRecipebyId(testId);

async function EditOneRecipebyId(recipeId) {
  const response = await fetch(link + "/api/recipes/" + recipeId, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "22 new Fish and chips",
      image: "22",
      instructions: "22change i",
      priceTotal: "22666",
      caloriesTotal: "22999",
      ingredients: ["222ingredOnenew", "222ingredTwonew"]
    })
  });
  let respJson = await response.json();
  console.log("respJsonReceived", respJson);
}
// EditOneRecipebyId(testId);

async function getAlRecipesByUserId(userId) {
  const response = await fetch(link + `/api/users/${userId}/recipes`);
  let respJson = await response.json();
  console.log("respJsonReceived", respJson);
}
// let testUserId = "5df269b2cd6c2c3123d3def4";
// getAlRecipesByUserId(testUserId);