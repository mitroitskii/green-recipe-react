import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text, Grid } from 'grommet';

const RecipeItem = (item) => {
  const { name, image, _id, ingredients, priceTotal, caloriesTotal, category, authorName, hours = "00", minutes = "00" } = item;
  // вернуть инструкции по желанию
  return (
    <Grid
      margin='medium'
      rows={['x small', 'small']}
      columns={['small', 'medium']}
      gap="small"
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'img', start: [0, 1], end: [0, 1] },
        { name: 'text', start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea='header' background='neutral-1'>
        <Link to={'/recipes/' + _id}>{name}</Link>
      </Box>
      <Box gridArea='img'>
        <Image src={image}
          alt={name}
          fit='contain'
          alignSelf='start'
        />
      </Box>
      <Box gridArea='text' background='accent-1'>
        <Text>Количество ингредиентов: {ingredients.length}</Text>
        <Text>Стоимость рецепта: {priceTotal} руб. </Text>
        <Text>Калорийность: {caloriesTotal} ккал </Text>
        <Text>Категория: {category}</Text>
        <Text>Автор: {authorName}</Text>
        <Text>Время приготовления: {hours}:{minutes} </Text>
      </Box>
    </Grid>
  );
}


export default RecipeItem;