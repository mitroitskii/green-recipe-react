import React, { useState } from 'react';
import { Box, TextInput, Select } from 'grommet';
import { NumberInput } from 'grommet-controls';
import CategorySelector from './CategorySelector';
import IngredientList from './IngredientList';
import IngredientSearchForm from './IngredientSearchForm';
import IngredientSlider from '../IngredientSlider/ingredientSlider';
import Instructions from './Instructions';

export default function RecipeForm() {
  const hrs = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ];
  const mins = [
    '0',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55'
  ];
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [portions, setPortions] = useState(1);
  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  return (
    <Box
      justify="between"
      gap="medium"
      width="large"
      height="medium"
      alignContent="stretch"
      pad="medium"
      margin="medium"
      fill="vertical"
    >
      <p>Новый рецепт</p>
      <TextInput
        placeholder="Название рецепта"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <p>Количество порций</p>
      <NumberInput
        min={1}
        max={12}
        value={portions}
        suffix="  порций"
        onChange={({ target: { value } }) => setPortions(value)}
      />
      <p>Ингредиенты</p>
      {ingredients &&
        ingredients.map(ingredient => (
          <IngredientList
            key={ingredient.id}
            ingredient={ingredient}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        ))}
      <IngredientSearchForm setSearch={setSearch} />
      {search && (
        <IngredientSlider
          search={search}
          setSearch={setSearch}
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      )}
      <p>Инструкции</p>
      <Instructions
        instructions={instructions}
        setInstructions={setInstructions}
      />
      <p>Категория</p>
      <CategorySelector />
      <p>Время приготовления</p>
      <Select
        id="hours"
        name="hours"
        placeholder="Часов"
        dropHeight="small"
        options={hrs}
        value={hours}
        onChange={({ option }) => setHours(option)}
      />
      <Select
        id="minutes"
        name="minutes"
        placeholder="минут"
        dropHeight="small"
        options={mins}
        value={minutes}
        onChange={({ option }) => setMinutes(option)}
      />
    </Box>
  );
}
