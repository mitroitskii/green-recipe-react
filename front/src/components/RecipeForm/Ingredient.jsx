import React from 'react';
import { Box, TextInput, Button, Text, Paragraph, Anchor } from 'grommet';
import { FormClose } from 'grommet-icons';
import './recipeForm.css';

export default function Ingredient(props) {
  const {
    ingredient,
    ingredients,
    setIngredients,
    setPriceTotal,
    setCaloriesTotal
  } = props;
  return (
    <Box
      // align="center"
      // alignContent="center"
      alignSelf="center"
      direction="row"
      round="small"
      // elevation="small"
      fill={false}
      flex="grow"
      width={{ min: '900px', max: '900px' }}
      margin={{ vertical: '20px', horizontal: '0px' }}
    >
      <Anchor alignSelf="center" elevation="small" href={ingredient.link}>
        {ingredient.name}
      </Anchor>
      <Box
        width={{ min: '70px', max: '70px' }}
        // elevation="small"
        round="small"
        // pad={{ vertical: '0px', horizontal: '43px' }}
        margin={{ vertical: '0px', horizontal: '10px' }}
        height="20px"
      >
        <TextInput
          placeholder="Вес"
          className="input"
          value={ingredient.inputWeight}
          onChange={({ target: { value } }) => {
            setIngredients(
              ingredients.map(ingr => {
                if (ingr.id === ingredient.id) {
                  ingr.inputWeight = value;
                  ingr.quantity = Math.ceil(value / ingr.weight);
                  ingr.priceTotal = ingr.quantity * ingr.price;
                  ingr.caloriesTotal = (value / 100) * ingr.calories;
                }
                return ingr;
              })
            );
            const newCalories = Math.round(
              ingredients.reduce((acc, ingr) => acc + ingr.caloriesTotal, 0)
            );
            setCaloriesTotal(newCalories);
            const newPrice = Math.round(
              ingredients.reduce((acc, ingr) => acc + ingr.priceTotal, 0)
            );
            setPriceTotal(newPrice);
          }}
        />
      </Box>
      <Text>гр.</Text>
      <Box
        width={{ min: '400px', max: '400px' }}
        // elevation="small"
        round="small"
        // pad={{ vertical: '0px', horizontal: '43px' }}
        margin={{ vertical: '0px', horizontal: '30px' }}
        height="20px"
      >
        <Paragraph alignSelf="left" textAlign="left">
          {ingredient.price} {ingredient.currency} x {ingredient.quantity} шт. = {ingredient.priceTotal} руб
        </Paragraph>
      </Box>
      <Box
        wrap
        direction="row"
        width="small"
        round="full"
        margin={{ left: 'xsmall' }}
      >
        <Button
          href="#"
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            const newIngredients = ingredients.filter(
              ingr => ingr.id !== ingredient.id
            );
            setIngredients(newIngredients);
          }}
          onFocus={event => event.stopPropagation()}
        >
          <Box background="accent-1" round="full" margin={{ left: 'xsmall' }}>
            <FormClose
              color="white"
              size="small"
              style={{ width: '25px', height: '25px' }}
            />
          </Box>
        </Button>
      </Box>
    </Box>
  );
}
