import React, { useState } from 'react';
import { Box, TextInput, Select } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { Redirect } from 'react-router-dom';
import Category from './Category';
import Ingredient from './Ingredient';
import Search from './Search';
import Slider from './Slider/Slider';
import Instructions from './Instructions';
import Submit from './Submit';

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
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [portions, setPortions] = useState(1);
  const [category, setCategory] = useState('');
  const [priceTotal, setPriceTotal] = useState('');
  const [caloriesTotal, setCaloriesTotal] = useState('');
  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [id, setId] = useState('');
  const image = 'http://galleria.restaserver.ru/pub/12/items/2991/824-824.jpg';
  const clickSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes/', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name,
          hours,
          minutes,
          image,
          portions,
          ingredients,
          instructions,
          category,
          priceTotal,
          caloriesTotal,
        }),
        credentials: 'include',
      });
      if (response.status === 200) {
        const { recipeId } = await response.json();
        setId(recipeId);
      } else {
        console.log(`ERROR: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (id) {
    return <Redirect to={`/recipes/${id}`} />;
  }
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
          <Ingredient
            key={ingredient.id}
            ingredient={ingredient}
            ingredients={ingredients}
            setIngredients={setIngredients}
            setPriceTotal={setPriceTotal}
            setCaloriesTotal={setCaloriesTotal}
          />
        ))}
      <Search setSearch={setSearch} />
      {search && (
        <Slider
          search={search}
          setSearch={setSearch}
          ingredients={ingredients}
          setIngredients={setIngredients}
          setCaloriesTotal={setCaloriesTotal}
          setPriceTotal={setPriceTotal}
        />
      )}
      <p>Инструкции</p>
      <Instructions
        instructions={instructions}
        setInstructions={setInstructions}
      />
      <p>Категория</p>
      <Category category={category} setCategory={setCategory} />
      <p>Время приготовления</p>
      <Select
        id="hours"
        name="hours"
        placeholder="часов"
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
      <Submit clickSubmit={clickSubmit} />
    </Box>
  );
}
