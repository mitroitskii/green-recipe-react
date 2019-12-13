import React from 'react';
import { Box, TextInput, TextArea } from 'grommet';
import CategorySelector from './CategorySelector';

export default function RecipeForm() {
  const [value, setValue] = React.useState('');
  return (
    <Box width="large" height="medium">
      <p>Новый рецепт</p>
      <TextInput
        placeholder="Название рецепта"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <p>Ингредиенты</p>
      <p>Инструкции</p>
      <TextArea resize={false} fill />
      <p>Категория</p>
      <CategorySelector />
    </Box>
  );
}
