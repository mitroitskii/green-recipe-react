const request = require('request-promise');
const parse = require('cheerio');

const parseSearchPageVV = async productName => {
  let link = encodeURI('https://vkusvill.ru/search/?q=' + productName);
  const products = [];
  try {
    const html = await request(link);
    const links = [];
    parse('.ProductCards__item', html).map(function() {
      let link = parse('.ProductCard__link', this).attr('href');
      links.push(link);
    });
    console.log('links', links);

    links.forEach(element => {
      products.push(parseProductPageVV(element));
    });
  } catch (err) {
    return err;
  }
};

const parseProductPageVV = async link => {
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
      kcal: parse('.DetailsList__value', html)
        .text()
        .trim(),

      link: fullLink,
    };

    // обработка разных неудобных весов
    let weight = result.weight;

    // могут быть варианты // Вес/объем: // Вес  //       мл л г кг
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

    result['weightAbsoulte'] = weightWithType[0];
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

    let kcal = result.kcal;
    // console.log("kcal before", kcal);

    if (kcal.indexOf(',') !== -1) {
      result['kcal'] = kcal.slice(0, kcal.indexOf(','));
    }

    result['weight'] = result['weight'].trim();
    result['currency'] = result['currency'].trim();
    console.log('result', result);
    return result;
  } catch (err) {
    return err;
  }
};
