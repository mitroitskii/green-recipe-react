import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text, DropButton } from 'grommet';

const RecipeItem = (item) => {
  const { name, image, _id, ingredients, priceTotal, caloriesTotal, category, authorName, hours, minutes } = item;
  // const ingredientsList = () => (<Box>{ingredients.map(item => (<a href={item.link}> {item.name} </a>))} </Box>)
  return (
    <Box direction='column' margin='small'>
      <Link style={{ "textDecoration": "none" }} to={'/recipes/' + _id}>
        <Box background='status-ok'>
          <Text margin='xsmall'>  {name}  </Text>
        </Box>
        <Box direction="row">
          <Box height='small' width='small' margin='xsmall' >
            <Image src={image}
              alt={name}
              fit='contain'
            />
          </Box>
          <Box margin='xsmall' alignSelf='center'>
            <Text>
              Ингредиенты: {ingredients.length}
              {/* <DropButton
              label={'Ингредиенты - ' + ingredients.length}
              dropAlign={{ top: 'bottom', right: 'right' }}
              dropContent={ingredientsList()}
            /> */}
            </Text>
            <Text>Стоимость рецепта: {priceTotal} руб. </Text>
            <Text>Калорийность: {caloriesTotal} ккал </Text>
            <Text>Категория: {category}</Text>
            <Text>Автор: {authorName}</Text>
            <Text>Время приготовления: {(hours === '1') ? `${hours} час` : ((hours > 0) && (hours < 5)) ? `${hours} часа` : `${hours} часов`} {(minutes != '0') && `${minutes} минут`} </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default RecipeItem;
