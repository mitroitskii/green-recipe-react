import React, { useState } from 'react';
import { Box, TextInput, Select } from 'grommet';
import { NumberInput } from 'grommet-controls';
import Dropzone from 'react-dropzone';
import CategorySelector from './CategorySelector';
import IngredientList from './IngredientList';
import IngredientSearchForm from './IngredientSearchForm';
import Instructions from './Instructions';

export default function RecipeForm() {
  const ingrs = [
    {
      id: 'qw42qedwawe233',
      name: 'Пюре мясное «Говядина»',
      weight: '100',
      rating: '4.8',
      price: '65',
      currency: 'руб/шт',
      link: 'https://vkusvill.ru/goods/pyure-myasnoe-govyadina.html',
      calories: '128',
      weightAbsoulte: '100',
      measureType: 'г',
      pricePerKilo: 650,
      priceTotal: null,
      caloriesTotal: 128,
      quantity: 1
    },
    {
      id: 'jjsfoefo88344',
      name: 'Говядина лопатка б/к',
      weight: '500',
      rating: '4.1',
      price: '645',
      currency: 'руб/кг',
      link: 'https://vkusvill.ru/goods/govyadina-lopatka-b-k.html',
      calories: '151',
      weightAbsoulte: '500',
      measureType: 'г',
      pricePerKilo: 1290,
      priceTotal: null,
      caloriesTotal: 755,
      quantity: 1
    },
    {
      id: 'llloo399233',
      name: 'Говядина с томленой картошкой',
      weight: '250',
      rating: '4.4',
      price: '181',
      currency: 'руб/шт',
      link: 'https://vkusvill.ru/goods/govyadina-s-tomlenoy-kartoshkoy.html',
      calories: '228,6',
      weightAbsoulte: '250',
      measureType: 'г',
      pricePerKilo: 724,
      priceTotal: null,
      caloriesTotal: null,
      quantity: 1
    }
  ];
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
  const [ingredients, setIngredients] = useState(ingrs);
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
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Загрузите изображение вашего блюда</p>
            </div>
          </section>
        )}
      </Dropzone>
    </Box>
  );
}
