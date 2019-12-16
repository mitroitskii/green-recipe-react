const ingredOne = {
  name: 'Говядина Премиум к/в, нарезка',
  weight: 100,
  rating: '4.7',
  price: 173,
  currency: 'руб/шт',
  link: 'https://vkusvill.ru/goods/govyadina-premium-k-v-narezka.html',
  calories: 104,
  weightAbsoulte: '100',
  measureType: 'г',
  pricePerKilo: 1730,
  quantity: 1,
  caloriesTotal: 104,
  priceTotal: 173,
  inputWeight: 500,
};

const ingredTwo = {
  name: 'Говядина лопатка б/к',
  weight: 500,
  rating: '4.1',
  price: 645,
  currency: 'руб/кг',
  link: 'https://vkusvill.ru/goods/govyadina-lopatka-b-k.html',
  calories: 151,
  weightAbsoulte: '500',
  measureType: 'г',
  pricePerKilo: 1290,
  quantity: 1,
  caloriesTotal: 755,
  priceTotal: 645,
  inputWeight: 500,
};

const RecipeExample = {
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
  author: '5df269b2cd6c2c3123d3def4',
  portions: 5,
  // author: req.session.userId
};

module.exports = { RecipeExample };
