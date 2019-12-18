import React from 'react';
import { Box, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

import './Card.css';

export default function Card(props) {
  const {
    ingredient,
    ingredients,
    setIngredients,
    setPriceTotal,
    setCaloriesTotal,
    setSearch,
    errors,
    setError,
  } = props;
  const handleClick = () => {
    const updatedIngredients = ingredients.concat([ingredient]);
    ingredient.priceTotal = ingredient.quantity * ingredient.price;
    ingredient.caloriesTotal = (ingredient.weight / 100) * ingredient.calories;
    ingredient.inputWeight = ingredient.weight;
    setIngredients(updatedIngredients);
    setCaloriesTotal(
      ingredients.reduce((acc, ingr) => acc + ingr.caloriesTotal, 0),
    );
    setPriceTotal(
      ingredients.reduce((acc, ingr) => acc + ingr.priceTotal, 0),
    );
    setError({ ...errors, ingredients: '' });
    setSearch('');
  };
  return (
    <Box className={'wrapper'}>
      <Box direction="column" height="100%" width="100%">
        <Box
          height="100%"
          width="100%"
          background={{
            image: `url(${ingredient.imageLink})`,
            position: 'center'
          }}
        />
        <Box
          className={'bottom'}
          direction="row-responsive"
          height="35%"
          width="100%"
        >
          <Box
            className={'details'}
            height="100%"
            width="70%"
            direction="column"
            align="center"
            pad="10px"
          >
            <Box>
              <marquee behavior="alternate" scrollamount="2" direction="right">
                <Text size="xlarge" textAlign="start">
                  {' '}
                  {ingredient.name}
                </Text>
              </marquee>
            </Box>
            <Text size="large">
              Цена: {ingredient.price} {ingredient.currency}.
            </Text>
            <Text size="large">
              Вес: {ingredient.weight} {ingredient.measureType}.
            </Text>
          </Box>
          <Box
            fit="content"
            align="center"
            justify="center"
            border={[{ side: 'left' }]}
            hoverIndicator
            onClick={handleClick}
          >
            <AddCircle size="large" />
            <Text alignSelf="center" size="medium">
              Добавить в рецепт
            </Text>
          </Box>
          {/* <Button icon={<AddCircle size="large" />} fit="content" align="center" justify="center" label="Добавить в рецепт" onClick={handleClick} /> */}
        </Box>
      </Box>
      {/* <div className={"inside"}>
                    <div className={"icon"}><i className={"material-icons"}>info</i></div>
                    <div className={"contents"}>
                        информация о товаре
                        </div>
                </div> */}
    </Box>
  );
}
