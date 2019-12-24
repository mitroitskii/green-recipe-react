import uuidv1 from 'uuid/v1';
import React, { useState } from 'react';
import { Box, TextInput, Select, Text, Paragraph } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { Redirect } from 'react-router-dom';
import Category from './Category';
import Ingredients from './Ingredients';
import Search from './Search';
import Slider from './Slider/Slider';
import Instruction from './Instruction';
import Submit from './Submit';
import Uploader from '../Uploader/uploader';
import './recipeForm.css';

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
        const response = await fetch('/api/recipes/', {
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
      alignContent="stretch"
      margin="medium"
      gap="medium"
      pad="medium"
      fill="vertical"
      direction="column"
      elevation="medium"
      width="80%"
      height="medium"
    >
      <Paragraph
        margin={{
          vertical: 'medium',
          horizontal: '...',
          top: 'large',
          bottom: '...',
          left: '...',
          right: '...'
        }}
        className="bold"
        alignSelf="center"
        size="small"
        responsive={true}
        textAlign="center"
      >
        НОВЫЙ РЕЦЕПТ
      </Paragraph>
      <Box
        align="center"
        alignContent="center"
        alignSelf="center"
        // basis="large"
        border="bottom"
        direction="row-responsive"
      >
        <TextInput
          plain={true}
          placeholder="    Название рецепта"
          value={name}
          className="ingredient-name"
          onChange={event => {
            setError({ ...errors, name: '' });
            setName(event.target.value);
          }}
        />
        {errors.name && (
          <Paragraph
            margin={{
              vertical: 'medium',
              horizontal: '...',
              top: 'large',
              bottom: '...',
              left: '...',
              right: '...'
            }}
            className="bold"
            alignSelf="center"
            size="small"
            responsive={true}
            textAlign="center"
            color="red"
          >
            {errors.name}
          </Paragraph>
        )}
      </Box>
      <Paragraph
        margin={{
          vertical: 'medium',
          horizontal: '...',
          top: 'large',
          bottom: '...',
          left: '...',
          right: '...'
        }}
        className="bold"
        alignSelf="center"
        size="small"
        responsive={true}
        textAlign="center"
      >
        КОЛИЧЕСТВО ПОРЦИЙ
      </Paragraph>
      <Box
        round="small"
        align="center"
        alignContent="center"
        alignSelf="center"
        // basis="large"
        // border="bottom"
        direction="row-responsive"
        elevation="small"
        fill={false}
        flex={false}
        width={{ min: '220px', max: '220px' }}
      >
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
      </Box>
      <Paragraph
        margin={{
          vertical: 'medium',
          horizontal: '...',
          top: 'large',
          bottom: '...',
          left: '...',
          right: '...'
        }}
        className="bold"
        alignSelf="center"
        size="small"
        responsive={true}
        textAlign="center"
      >
        ИНГРЕДИЕНТЫ
      </Paragraph>
      {ingredients.length > 0 && (
        <Ingredients
          ingredients={ingredients}
          setIngredients={setIngredients}
          setPriceTotal={setPriceTotal}
          setCaloriesTotal={setCaloriesTotal}
        />
      )}
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
      <Paragraph
        margin={{
          vertical: 'medium',
          horizontal: '...',
          top: 'large',
          bottom: '...',
          left: '...',
          right: '...'
        }}
        className="bold"
        alignSelf="center"
        size="small"
        responsive={true}
        textAlign="center"
      >
        ИНСТРУКЦИИ
      </Paragraph>
      {instructions &&
        instructions.map((instruction, index) => (
          <Box
            // align="center"
            // alignContent="center"
            alignSelf="center"
            direction="row-responsive"
            key={instruction.id}
          >
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
      <Box
        alignSelf="center"
        alignContent="center"
        direction="row"
        round="small"
        // elevation="small"
        fill={false}
        flex="grow"
        margin={{ vertical: '0px' }}
        width={{ min: '800px', max: '800px' }}
      >
        <Box
          alignSelf="left"
          alignContent="top"
          direction="column"
          round="small"
          // elevation="small"
          fill={false}
          flex="grow"
          margin={{ vertical: '0px' }}
          // width={{ min: '800px', max: '800px' }}
        >
          <Paragraph
            margin={{
              vertical: 'medium',
              horizontal: '...',
              top: 'large',
              bottom: '...',
              left: '...',
              right: '...'
            }}
            className="bold"
            alignSelf="left"
            size="small"
            responsive={true}
            textAlign="left"
          >
            КАТЕГОРИЯ
          </Paragraph>
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
        </Box>
        <Box
          alignSelf="right"
          direction="column"
          round="small"
          // elevation="small"
          fill={false}
          flex="grow"
          margin={{ vertical: '0px' }}
          // width={{ min: '800px', max: '800px' }}
        >
          <Paragraph
            margin={{
              vertical: 'medium',
              horizontal: '...',
              top: 'large',
              bottom: '...',
              left: '...',
              right: '...'
            }}
            className="bold"
            alignSelf="left"
            size="small"
            responsive={true}
            textAlign="left"
          >
            ВРЕМЯ ПРИГОТОВЛЕНИЯ
          </Paragraph>
          <Select
            id="hours"
            name="hours"
            placeholder="часов"
            dropHeight="small"
            options={hrs}
            value={hours}
            onChange={({ option }) => setHours(option)}
          />
          <Paragraph
            className="bold"
            alignSelf="left"
            size="small"
            responsive={true}
            textAlign="left"
          >
            ч.
          </Paragraph>
          <Select
            id="minutes"
            name="minutes"
            placeholder="минут"
            dropHeight="small"
            options={mins}
            value={minutes}
            onChange={({ option }) => setMinutes(option)}
          />
          <Paragraph
            className="bold"
            alignSelf="left"
            size="small"
            responsive={true}
            textAlign="left"
          >
            мин.
          </Paragraph>
        </Box>
      </Box>
      <Box
        alignSelf="center"
        alignContent="center"
        direction="row"
        round="small"
        // elevation="small"
        fill={false}
        flex="grow"
        width="400px"
        margin={{
          "left": "55px"
        }}

      >
      <Uploader setImage={setImage} />
      {errors.image && (
        <Text size="medium" color="red">
          {errors.image}
        </Text>
      )}
      </Box>
      <Box
        alignSelf="center"
        alignContent="center"
        direction="row"
        round="small"
        // elevation="small"
        fill={false}
        flex="grow"
        margin={{ vertical: '0px' }}
      >
        <Submit name="СОЗДАТЬ РЕЦЕПТ" clickSubmit={clickSubmit} />
        {errors.server && (
          <Text size="medium" color="red">
            {errors.server}
          </Text>
        )}
      </Box>
    </Box>
  );
}
