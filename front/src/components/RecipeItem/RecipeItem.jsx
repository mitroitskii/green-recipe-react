import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text, DropButton } from 'grommet';

const RecipeItem = (item) => {
  const { name, image, _id, ingredients, priceTotal, caloriesTotal, category, authorName, hours, minutes } = item;
  const ingredientsList = () => (<Box margin='xsmall'>{ingredients.map(item => (<a key={item.id} style={{ "textDecoration": "none" }} href={item.link} target='_blank'> <Text> {item.name}</Text> </a>))} </Box>)
  return (
    <Box direction='column' margin='small' width='large'>
      <Box background='status-ok'>
        <Link style={{ "textDecoration": "none" }} to={'/recipes/' + _id}> <Text margin='xsmall'>  {name}  </Text> </Link>
      </Box>
      <Box direction="row">
        <Box height='small' width='small' margin='xsmall' >
          <Image src={image}
            alt={name}
            fit='contain'
          />
        </Box>
        <Box margin='xsmall' alignSelf='center'>
          <DropButton
            label={'Ингредиенты - ' + ingredients.length}
            dropAlign={{ top: 'bottom', left: 'left' }}
            dropContent={ingredientsList()}
          />
          <Text>Стоимость рецепта: {priceTotal} руб. </Text>
          <Text>Калорийность: {caloriesTotal} ккал </Text>
          <Text>Категория: {category}</Text>
          <Text>Автор: {authorName}</Text>
          <Text>Время приготовления: {(hours === 0) ? `${hours} час` : ((+hours > 0) && (hours < 5)) ? `${hours} часа` : `${hours} часов`} {(minutes != '0') && `${minutes} минут`} </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeItem;
