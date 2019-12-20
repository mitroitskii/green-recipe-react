import uuidv1 from 'uuid/v1';
import React, { Component } from 'react';
import { Box, TextInput, Select, Text } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { Redirect } from 'react-router-dom';
import Category from './Category';
import Ingredient from './Ingredient';
import Search from './Search';
import Slider from './Slider/Slider';
import Instruction from './Instruction';
import Submit from './Submit';
import Uploader from '../Uploader/uploader';

export default class RecipeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      hours: '0',
      minutes: '0',
      image: '',
      portions: '',
      portionsSuffix: ' порция',
      category: '',
      priceTotal: '',
      caloriesTotal: '',
      search: '',
      ingredients: [],
      instructions: [],
      errors: [],
      reload: false
    };
    this.clickSubmit = this.clickSubmit.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`/api/recipes/${id}`);
    const result = await response.json();
    const {
      _id,
      name,
      hours,
      minutes,
      portions,
      portionsSuffix,
      category,
      priceTotal,
      caloriesTotal,
      ingredients,
      instructions,
      image
    } = result.recipe;
    const newInstructions = instructions.concat([{ id: uuidv1(), text: '' }]);
    this.setState(() => ({
      id: _id,
      name,
      hours,
      minutes,
      portions,
      portionsSuffix,
      category,
      priceTotal,
      caloriesTotal,
      ingredients,
      instructions: newInstructions,
      image
    }));
  }

  async clickSubmit() {
    const {
      name,
      image,
      ingredients,
      instructions,
      category,
      errors
    } = this.state;
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
      this.setState(prevState => ({
        ...prevState,
        errors: newErrors
      }));
    } else {
      try {
        const {
          id,
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
          portionsSuffix
        } = this.state;
        let instructionsTrimmed = instructions;
        if (instructions[instructions.length - 1].text === '') {
          instructionsTrimmed = instructions.slice(0, instructions.length - 1);
        }
        const response = await fetch(
          `/api/recipes/${id}`,
          {
            method: 'PUT',
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
          }
        );
        if (response.status === 200) {
          this.setState(() => ({ reload: true }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            errors: { ...errors, server: `ERROR: ${response.status}` }
          }));
        }
      } catch (error) {
        this.setState(prevState => ({
          ...prevState,
          errors: { ...prevState.errors, server: error }
        }));
      }
    }
  }

  render() {
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
    const {
      id,
      reload,
      name,
      errors,
      portions,
      portionsSuffix,
      ingredients,
      instructions,
      search,
      category,
      hours,
      minutes
    } = this.state;

    if (reload) {
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
          placeholder="Введите название рецепта"
          value={name}
          onChange={event => {
            const { value } = event.target;
            this.setState(prevState => ({
              name: value,
              errors: { ...prevState.errors, name: '' }
            }));
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
              this.setState(prevState => ({
                ...prevState,
                portionsSuffix: ' порция'
              }));
            } else if (parseFloat(value) > 4) {
              this.setState(prevState => ({
                ...prevState,
                portionsSuffix: ' порций'
              }));
            } else {
              this.setState(prevState => ({
                ...prevState,
                portionsSuffix: ' порции'
              }));
            }
            this.setState(() => ({
              portions: value
            }));
          }}
        />
        <p>Ингредиенты</p>
        {ingredients &&
          ingredients.map(ingredient => (
            <Ingredient
              key={ingredient.id}
              ingredient={ingredient}
              ingredients={ingredients}
              setIngredients={args => {
                this.setState(prevState => ({
                  ...prevState,
                  ingredients: args
                }));
              }}
              setPriceTotal={args => {
                this.setState(prevState => ({
                  ...prevState,
                  priceTotal: args
                }));
              }}
              setCaloriesTotal={args => {
                this.setState(prevState => ({
                  ...prevState,
                  caloriesTotal: args
                }));
              }}
            />
          ))}
        <Search
          setSearch={args => {
            this.setState(prevState => ({
              ...prevState,
              search: args
            }));
          }}
        />
        {search && (
          <Slider
            search={search}
            setSearch={args => {
              this.setState(prevState => ({
                ...prevState,
                search: args
              }));
            }}
            ingredients={ingredients}
            setIngredients={args => {
              this.setState(prevState => ({
                ...prevState,
                ingredients: args
              }));
            }}
            setCaloriesTotal={args => {
              this.setState(prevState => ({
                ...prevState,
                caloriesTotal: args
              }));
            }}
            setPriceTotal={args => {
              this.setState(prevState => ({
                ...prevState,
                priceTotal: args
              }));
            }}
            errors={errors}
            setError={args => {
              this.setState(prevState => ({
                ...prevState,
                errors: args
              }));
            }}
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
                setInstructions={args => {
                  this.setState(prevState => ({
                    ...prevState,
                    instructions: args
                  }));
                }}
                errors={errors}
                setError={args => {
                  this.setState(prevState => ({
                    ...prevState,
                    errors: args
                  }));
                }}
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
          setCategory={args => {
            this.setState(prevState => ({
              ...prevState,
              category: args
            }));
          }}
          errors={errors}
          setError={args => {
            this.setState(prevState => ({
              ...prevState,
              errors: args
            }));
          }}
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
          onChange={({ option }) => {
            this.setState({ hours: option });
          }}
        />
        <Select
          id="minutes"
          name="minutes"
          placeholder="минут"
          dropHeight="small"
          options={mins}
          value={minutes}
          onChange={({ option }) => this.setState({ minutes: option })}
        />
        <Uploader
          setImage={args => {
            this.setState(prevState => ({
              ...prevState,
              image: args
            }));
          }}
        />
        {errors.image && (
          <Text size="medium" color="red">
            {errors.image}
          </Text>
        )}
        <Submit name="Изменить рецепт" clickSubmit={this.clickSubmit} />
        {errors.server && (
          <Text size="medium" color="red">
            {errors.server}
          </Text>
        )}
      </Box>
    );
  }
}
