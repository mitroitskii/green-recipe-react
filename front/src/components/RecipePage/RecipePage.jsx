import {
  Box,
  Image,
  Heading,
  Anchor,
} from 'grommet';
import { NumberInput } from 'grommet-controls';
import React, { Component } from 'react';
import IngredientsListTable from './IngredientsListTable';
import LabelledMeter from './Meter';
import './Ingredients.css';


export default class RecipePage extends Component {
  state = {
    defaultPortions: 0,
    portions: 0,
    ingredients: [],
    priceTotal: 0,
    caloriesTotal: 0,
    name: '',
    image: '',
    instructions: [],
    hours: '',
    minutes: '',
    portionCaption: 'порции'
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    const { id } = this.props.match.params;
    const response = await fetch(`/api/recipes/${id}`);
    const respJson = await response.json();
    const {
      portions,
      ingredients,
      priceTotal,
      caloriesTotal,
      name,
      image,
      instructions,
      hours,
      minutes,
      authorName,
      category,
      author
    } = respJson.recipe;

    this.setState(() => ({
      defaultPortions: portions,
      portions,
      ingredients,
      priceTotal: Math.round(priceTotal),
      caloriesTotal: Math.round(caloriesTotal),
      name,
      image,
      hours,
      minutes,
      authorName,
      category,
      author,
      instructions 
    }));
  }

  countTotalCalories() {
    let ratio = this.state.portions / this.state.defaultPortions;
    let totalCalories = 0;
    this.state.ingredients.map(ingredient => {
      totalCalories +=
        (ingredient.calories * ingredient.inputWeight * ratio) / 100;
    });
    return Math.round(totalCalories);
  }

  countTotalPrice() {
    let ratio = this.state.portions / this.state.defaultPortions;
    let totalPrice = 0;
    this.state.ingredients.map(ingredient => {
      let quantity = Math.ceil(
        (ingredient.inputWeight * ratio) / ingredient.weight
      );

      totalPrice += ingredient.price * quantity;
    });
    return Math.round(totalPrice);
  }

  async setPortions(value) {
    await this.setState(() => ({ portions: value }));

    this.setState(() => ({ caloriesTotal: this.countTotalCalories() }));
    this.setState(() => ({ priceTotal: this.countTotalPrice() }));

    if (parseFloat(value) === 1) {
      this.setState(() => ({ portionCaption: 'порция' }));
    } else if (parseFloat(value) > 4) {
      this.setState(() => ({ portionCaption: 'порций' }));
    } else {
      this.setState(() => ({ portionCaption: 'порции' }));
    }
  }

  render() {
    return (
      <Box elevation="medium" direction="column" width="80%" gap="medium">
        <Box
          align="center"
          direction="column"
          animation="fadeIn"
          width="100%"
        >
          <Anchor
            className="testText"
            margin={{
              top: 'small'
            }}
            alignSelf="center"
            label={this.state.category}
            href="/recipes"
            textAlign="center"
          />

          <Heading
            className="headerStyle"
            margin={{
              bottom: 'small',
              top: 'medium'
            }}
            alignSelf="center"
            level={1}
            textAlign="center"
          >
            {this.state.name}
          </Heading>

          <Heading
            className="author"
            textAlign="center"
            alignSelf="center"
            margin={{
              bottom: 'none'
            }}
            level={4}
          >
            Автор: {this.state.authorName}
          </Heading>
        </Box>

        <Box
          width="100%"
          height="500px"
          elevation="medium"
          alignSelf="center"
          animation="fadeIn"
        >
          <Image
            fit="cover"
            height="100%"
            width="100%"
            elevation="medium"
            fill={true}
            src={this.state.image}
          />
        </Box>

        <Box
          className="testText"
          width="80%"
          justify="between"
          animation="fadeIn"
          alignSelf="center"
          direction="row"
        >
          <LabelledMeter
            infoRecipe
            meterValue={parseFloat(this.state.caloriesTotal)}
            meterType={'Ккал'}
          />
          <LabelledMeter
            meterValue={
              parseFloat(this.state.hours) * 60 + parseFloat(this.state.minutes)
            }
            meterType={'Минут'}
          />
          <LabelledMeter
            meterValue={parseFloat(this.state.priceTotal)}
            meterType={'Рублей'}
          />
        </Box>
        <Box
          width="100%"
          direction="row"
          animation="fadeIn"
          align="center"
          justify="between"
        >
          <Box
            className="testText"
            direction="row"
            justify="start"
            margin={{
              left: 'large'
            }}
          >
            <Heading
              margin={{
                left: 'small',
                top: 'small',
                bottom: 'small'
              }}
              level={3}
            >
              ИНГРЕДИЕНТЫ:
            </Heading>
          </Box>
          <Box
            margin={{
              right: 'large'
            }}
            align="center"
            justify="between"
            direction="row"
            height="100%"
            justify="end"
            width="200px"
          >
            <NumberInput
              className="testText"
              min={1}
              max={12}
              value={this.state.portions}
              suffix={`  ${this.state.portionCaption}`}
              onChange={({ target: { value } }) => {
                this.setPortions(value);
              }}
            />
          </Box>
        </Box>
        <Box
          className="testText"
          elevation="xsmall"
          width="100"
          animation="fadeIn"
          margin={{
            left: 'large',
            right: 'large'
          }}
        >
          <IngredientsListTable
            defaultPortions={parseFloat(this.state.defaultPortions)}
            portions={parseFloat(this.state.portions)}
            ingredients={this.state.ingredients}
          />
        </Box>

        <Box
          className="testText"
          width="100"
          animation="fadeIn"
          margin={{
            left: 'large',
            right: 'large'
          }}
        >
          <Heading
            margin={{
              top: 'small'
            }}
            level={3}
          >
            ИНСТРУКЦИИ:
          </Heading>
          <ul className="list4a">
            {this.state.instructions.map((ingredient, index) => (
              <>
                <li className="testText" key={ingredient.id}>
                  {ingredient.text}
                </li>
              </>
            ))}
          </ul>
        </Box>
      </Box>
    );
  }
}
