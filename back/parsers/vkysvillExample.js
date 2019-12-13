const { parseSearchPageVV, parseProductPageVV } = require('./vkysvill');

// тест одной страницы одного продукта
async function TestSinglePageParse() {
  let testLink = '/goods/ris-shlifovannyy-dlinnozernyy-500-gr.html';
  console.log(
    'Тест парсинга одной страницы ',
    await parseProductPageVV(testLink),
  );
}
// TestSinglePageParse();
//  {
//   name: 'Рис шлифованный длиннозерный, 500 гр',
//   weight: '500',
//   rating: '4.8',
//   price: '53',
//   currency: 'руб/шт',
//   link: 'https://vkusvill.ru/goods/ris-shlifovannyy-dlinnozernyy-500-gr.html',
//   kcal: '321',
//   weightAbsoulte: '500',
//   measureType: 'г',
//   pricePerKilo: 106
// }

// тест одного продукта
async function TestProductParse(productname) {
  let testParsqReq = await parseSearchPageVV(productname);
  console.log('Тест парсинга одного продукта', testParsqReq);
}
// TestProductParse('рис');

let ingredients = [
  'мёд',
  'помидор',
  'картофель',
  'лук',
  'чеснок',
  'масло оливковое',
  'перец',
  'ножка барашка',
  'прованские травы',
];

// // тест одного рецепта
async function TestRecipeParseSync() {
  for (let i = 0; i < ingredients.length; i++) {
    console.log('Парсинг ингредиента', ingredients[i]);
    result = await TestProductParse(ingredients[i]);
    console.log(result);
  }
}
// TestRecipeParseSync();

// появляются 503 error иногда
async function TestRecipeParseAS() {
  await Promise.all(
    ingredients.map(async ingredient => {
      productParseResult = await TestProductParse(ingredient);
      console.log('productParseResult', productParseResult);
    }),
  );
}
// TestRecipeParseAS()
