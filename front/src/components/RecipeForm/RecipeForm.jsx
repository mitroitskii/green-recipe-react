import uuidv1 from 'uuid/v1';
import React, { useState } from 'react';
import { Box, TextInput, Select, Text } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { Redirect } from 'react-router-dom';
import Category from './Category';
import Ingredient from './Ingredient';
import Search from './Search';
import Slider from './Slider/Slider';
import Instruction from './Instruction';
import Submit from './Submit';
import Uploader from '../Uploader/uploader'
import './recipeForm.css'

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

export default function RecipeForm(props) {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [portions, setPortions] = useState(1);
  const [category, setCategory] = useState('');
  const [priceTotal, setPriceTotal] = useState('');
  const [caloriesTotal, setCaloriesTotal] = useState('');
  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([
    { id: uuidv1(), text: '' }
  ]);
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [errors, setError] = useState({
    name: '',
    image: '',
    ingredients: '',
    instructions: '',
    category: ''
  });
  const [portionsSuffix, setSuffix] = useState(' порция');

  const clickSubmit = async () => {
    // debugger;
    if (
      !name ||
      !image ||
      ingredients.length === 0 ||
      instructions[0].text === '' ||
      !category
    ) {
      const newErrors = {};
      if (!name) {
        newErrors.name = 'Пожалуйста, введите название рецепта';
      }
      if (!image) {
        newErrors.image = 'Пожалуйста, добавьте фото рецепта';
      }
      if (!category) {
        newErrors.category = 'Пожалуйста, укажите категорию рецепта';
      }
      if (ingredients.length === 0) {
        newErrors.ingredients = 'Пожалуйста, добавьте ингредиенты';
      }
      if (instructions[0].text === '') {
        newErrors.instructions =
          'Пожалуйста, заполните инструкции по приготовлению';
      }
      setError(newErrors);
    } else {
      try {
        let instructionsTrimmed = instructions;
        if (instructions[instructions.length - 1].text === '') {
          instructionsTrimmed = instructions.slice(0, instructions.length - 1);
        }
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
            instructions: instructionsTrimmed,
            category,
            priceTotal,
            caloriesTotal,
            portionsSuffix
          }),
          credentials: 'include'
        });
        if (response.status === 200) {
          const { recipeId } = await response.json();
          setId(recipeId);
        } else {
          setError({ ...errors, server: `ERROR: ${response.status}` });
        }
      } catch (error) {
        setError({ ...errors, server: error });
      }
    }
  };

  if (id) {
    return <Redirect to={`/recipes/${id}`} />;
  }
  return (
    <Box
      justify="between"
      gap="medium"
      direction="column"
      elevation="medium"
      width="80%"
      height="medium"
      alignContent="stretch"
      pad="medium"
      margin="medium"
      fill="vertical"
    >
      <Text>Новый рецепт</Text>
      <TextInput
        placeholder="Введите название рецепта"
        value={name}
        onChange={event => {
          setError({ ...errors, name: '' });
          setName(event.target.value);
        }}
      />
      {errors.name && (
        <Text size="medium" color="red">
          {errors.name}
        </Text>
      )}
      <p>Количество порций</p>
      <NumberInput
        min={1}
        max={12}
        value={portions}
        suffix={portionsSuffix}
        onChange={({ target: { value } }) => {
          if (parseFloat(value) === 1) {
            setSuffix(' порция');
          } else if (parseFloat(value) > 4) {
            setSuffix(' порций');
          } else {
            setSuffix(' порции');
          }
          setPortions(value);
        }}
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
          errors={errors}
          setError={setError}
        />
      )}
      {errors.ingredients && (
        <Text size="medium" color="red">
          {errors.ingredients}
        </Text>
      )}
      <p>Инструкции</p>
      {instructions &&
        instructions.map((instruction, index) => (
          <Box key={instruction.id}>
            <Text>{index + 1}</Text>
            <Instruction
              instruction={instruction}
              instructions={instructions}
              setInstructions={setInstructions}
              errors={errors}
              setError={setError}
              index={index}
            />
          </Box>
        ))}
      {errors.instructions && (
        <Text size="medium" color="red">
          {errors.instructions}
        </Text>
      )}
      <p>Категория</p>
      <Category
        category={category}
        setCategory={setCategory}
        errors={errors}
        setError={setError}
      />
      {errors.category && (
        <Text size="medium" color="red">
          {errors.category}
        </Text>
      )}
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
      <Uploader setImage={setImage} />
      {errors.image && (
        <Text size="medium" color="red">
          {errors.image}
        </Text>
      )}
      <Submit name="Создать новый рецепт" clickSubmit={clickSubmit} />
      {errors.server && (
        <Text size="medium" color="red">
          {errors.server}
        </Text>
      )}
    </Box>
  );
}
