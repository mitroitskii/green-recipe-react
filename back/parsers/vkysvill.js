const request = require('request-promise');
const parse = require('cheerio');
const Ingredient = require('../models/ingredient');

async function parseSearchPageVV(productName) {
  let link = encodeURI('https://vkusvill.ru/search/?q=' + productName);
  const products = [];
  try {
    const html = await request(link);
    const links = [];
    parse('.ProductCards__item', html).map(function() {
      let link = parse('.ProductCard__link', this).attr('href');
      links.push(link);
    });
    // console.log('links', links);

    // Синхронный запуск
    // for (let i = 0; i < links.length; i++) {
    //   productInfo = await parseProductPageVV(links[i]);
    //   console.log('productInfo'), productInfo;
    //   products.push(productInfo);
    // }

    // Асинхронный запуск
    await Promise.all(
      links.map(async link => {
        productInfo = await parseProductPageVV(link);
        // console.log('productInfo', productInfo);
        products.push(productInfo);
      }),
    );

    // console.log('products', products);
    return products;
  } catch (err) {
    return err;
  }
}

async function parseProductPageVV(link) {
  try {
    const fullLink = 'https://vkusvill.ru' + link;
    const html = await request(encodeURI(fullLink));

    const result = {
      name: parse('.Product__title', html)
        .text()
        .trim(),
      weight: parse('.Product__listItem', html)
        .text()
        .trim(),
      rating: parse('.Rating__text', html)
        .text()
        .trim(),
      price: parse('.Price__value', html)
        .text()
        .trim(),
      currency: parse('.Price__unit', html)
        .text()
        .trim(),
      link: fullLink,
    };

    // калорийность и другая пищевая ценность не везде есть
    nutritionDict = {};
    parse('.DetailsList__item', html).map(function() {
      let value = parse('.DetailsList__value', this).text();
      let name = parse('.DetailsList__text', this).text();
      try {
        nutritionDict[name] = value;
      } catch (error) {}
    });
    result['kcal'] = 0;
    if ('ккал' in nutritionDict) {
      result['kcal'] = nutritionDict['ккал'];
    }

    // обработка разных неудобных весов
    let weight = result.weight;
    // могут быть варианты // Вес/объем: // Вес  //   мл л г кг
    let weightWithType = [];
    if (weight.indexOf('Вес/объем:') !== -1) {
      weight = weight.slice(weight.indexOf('Вес/объем:') + 11);
      let nums = weight.replace(/\D|\s/g, '');
      let WeightType = weight.replace(/\w|\s/g, '');
      weightWithType = [nums, WeightType];
    } else if (weight.indexOf('Вес') !== -1) {
      weight = weight.slice(weight.indexOf('Вес') + 5);
      weightWithType = weight.split(/(?<=^\S+)\s/);
    }

    result['weightAbsolute'] = weightWithType[0];
    result['measureType'] = weightWithType[1];
    if (weightWithType[1] === 'г') {
      result['weight'] = weightWithType[0];
    } else if (weightWithType[1] === 'кг') {
      weightWithType[0] = weightWithType[0].replace(',', '.');
      result['weight'] = (parseFloat(weightWithType[0]) * 1000).toString();
    } else if (weightWithType[1] === 'мл') {
      result['weight'] = weightWithType[0];
    } else if (weightWithType[1] === 'л') {
      weightWithType[0] = weightWithType[0].replace(',', '.');
      result['weight'] = (parseFloat(weightWithType[0]) * 1000).toString();
    }

    result['weight'] = result['weight'].trim();
    result['currency'] = result['currency'].trim();
    if (parseFloat(result['price']) > 0) {
      result['pricePerKilo'] = Math.round(
        (parseFloat(result['price']) / parseFloat(result['weight'])) * 1000,
      );
    }

    console.log('result', result);

    const newIngredient = new Ingredient(result);

    return newIngredient;
  } catch (err) {
    return err;
  }
}

module.exports = { parseProductPageVV, parseSearchPageVV };
