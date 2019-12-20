import React from 'react';
import { Select, Box, Text } from 'grommet';

const categories = [
  'Любая категория',
  'Холодная закуска',
  'Горячая закуска',
  'Суп',
  'Горячее блюдо',
  'Салат',
  'Каша',
  'Паста',
  'Десерт'
];

export default function CategorySelector({ recipesCategory, recipesFromApi }) {
  const [value, setValue] = React.useState('Любая категория');
  return (
    <Box direction="row">
      <Text margin='xsmall' alignSelf='center'> Выберите категорию </Text>
      <Select
        value={value}
        placeholder="Выберите категорию блюда"
        options={categories}
        onChange={({ option }) => {
          setValue(option);
          if (option === 'Любая категория') {
            recipesFromApi()
          } else recipesCategory(option)
        }}
      />
    </Box>
  );
}
