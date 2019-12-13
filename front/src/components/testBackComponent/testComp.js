const fetch = require("node-fetch");
link = "http://localhost:5000"

async function getAll() {
  const response = await fetch(link + "/api/recipes/");
  let respJson = await response.json();
  console.log("respJsonreceived", respJson);
}

async function CreateOne(recipe) {
  const response = await fetch(link + "/api/recipes/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(recipe)
  });
  let respJson = await response.json();
  console.log("respJsonreceived", respJson);
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
  name: "Denis",
  image: "",
  instructions: "instrructions1",
  priceTotal: "500",
  caloriesTotal: "800",
  ingredients: [ingredOne, ingredTwo],
  author: "AuthorOne"
};

let recipeTwo = {
  name: "Artem",
  image: "",
  instructions: "instrructions2",
  priceTotal: "600",
  caloriesTotal: "900",
  ingredients: [ingredOne, ingredTwo],
  author: "AuthorTwo"
};

CreateOne(recipeTwo);
// getAll()