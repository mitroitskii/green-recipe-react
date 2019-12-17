import React, { useState } from 'react';
import { Box, TextInput, Button } from 'grommet';
import { FormClose } from 'grommet-icons';

export default function IngredientLine(props) {
  const { ingredient, ingredients, setIngredients } = props;
  return (
    <Box>
      <a href={ingredient.link}>{ingredient.name}</a>
      <TextInput
        placeholder="Вес"
        value={ingredient.inputWeight}
        onChange={({ target: { value } }) =>
          setIngredients(
            ingredients.map((ingr) => {
              if (ingr.id === ingredient.id) {
                ingr.inputWeight = value;
                ingr.quantity = Math.ceil(value / ingr.weight);
                ingr.priceTotal = ingr.quantity * ingr.price;
                ingr.caloriesTotal = (value / 100) * ingr.calories;
              }
              return ingr;
            }),
          )
        }
      />
      <span>
        - {ingredient.price} {ingredient.currency} x {ingredient.quantity} :{' '}
        {ingredient.priceTotal} рублей
        <Box
          wrap
          direction="row"
          width="small"
          round="full"
          margin={{ left: 'xsmall' }}
        >
          <Button
            href="#"
            onClick={(event) => {
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
      </span>
    </Box>
  );
}
