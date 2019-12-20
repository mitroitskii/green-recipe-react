import React from 'react';
import { Box, TextInput, Button, Text, Paragraph, Anchor } from 'grommet';
import { FormClose } from 'grommet-icons';
import './recipeForm.css';

export default function Ingredients(props) {
  const {
    ingredients,
    setIngredients,
    setPriceTotal,
    setCaloriesTotal
  } = props;
  return (
    <Box
      alignSelf="center"
      alignContent="center"
      elevation="xsmall"
      width="900px"
      animation="fadeIn"
    >
      <table>
        <thead>
          <tr>
            <th />
            <th>Вес</th>
            <th>Ккал</th>
            <th>Цена</th>
            <th>Шт</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ingredient => (
            <tr key={ingredient.id} className="testText ">
              <td className="paddingTd">
                <Anchor
                  label={ingredient.name}
                  href={ingredient.link}
                  target="_blank"
                />
              </td>
              <td width="8%">
                <Box
                  width={{ min: '70px', max: '70px' }}
                  margin={{ vertical: '0px', horizontal: '0px' }}
                  align="center"
                  alignContent="center"
                  alignSelf="center"
                  direction="row"
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
                            ingr.priceTotal = Math.round(ingr.quantity * ingr.price);
                            ingr.caloriesTotal = Math.round((value / 100) * ingr.calories);
                          }
                          return ingr;
                        })
                      );
                      const newCalories = Math.round(
                        ingredients.reduce(
                          (acc, ingr) => acc + ingr.caloriesTotal,
                          0
                        )
                      );
                      setCaloriesTotal(newCalories);
                      const newPrice = Math.round(
                        ingredients.reduce(
                          (acc, ingr) => acc + ingr.priceTotal,
                          0
                        )
                      );
                      setPriceTotal(newPrice);
                    }}
                  />
                </Box>
              </td>
              <td className="centered">{ingredient.caloriesTotal}</td>
              <td className="centered">{ingredient.priceTotal}</td>
              <td className="centered">{ingredient.quantity}</td>
              <td width="8%">
                <Box
                  wrap
                  direction="row"
                  width="10px"
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
                    <Box
                      background="accent-1"
                      round="full"
                      margin={{ left: '15px' }}
                    >
                      <FormClose
                        color="white"
                        size="small"
                        style={{ width: '25px', height: '25px' }}
                      />
                    </Box>
                  </Button>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
