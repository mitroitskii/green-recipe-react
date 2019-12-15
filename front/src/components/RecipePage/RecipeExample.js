const ingredOne = {
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

const ingredTwo = {
  name: "Окунь филе на коже зам.",
  weight: "600",
  rating: "4.6",
  price: "611",
  currency: "р/кг",
  link: "https://vkusvill.ru/upload/resize/94848/94848_530x300x85_c.jpg",
  kcal: "99",
  weightAbsoulte: "600",
  measureType: "г",
  pricePerKilo: 611
};

const RecipeExample = {
  name: "Окунь с рисом",
  image: "https://vkusvill.ru/upload/resize/94964/94964_530x300x85_c.jpg",
  instructions: ['Разморозить рыбу и долго дого смотреть какая это длинная строка',"сварить рис", "посыпать специями", "Жарить 30 минут", "отделить филе от костей", "подать с лимоном"],
  priceTotal: "800",
  caloriesTotal: "900",
  ingredients: [ingredOne, ingredTwo],
  author: "5df269b2cd6c2c3123d3def4"
  // author: req.session.userId
};

module.exports = { RecipeExample };
