import { Grommet, Box, Grid, Image, Heading, } from 'grommet';
import { grommet } from 'grommet/themes';
import { NumberInput } from 'grommet-controls';
import React, { Component } from 'react';
import InstructionsList from './Instructions';
import IngredientsList from "./IngredientsList"
import LabelledMeter from './Meter';

// const { RecipeExample } = require('./RecipeExample');

export default class RecipePage extends Component {

  state = {
    defaultPortions: 0,
    portions: 0,
    ingredients: [],
    priceTotal: 0,
    caloriesTotal: 0,
    name: '',
    image: '',
    instructions: []

  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    // console.log("id of page", id);
    // const testId = '5df87e189fb92116d2af03c4';
    const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
    const respJson = await response.json();
    // console.log('respJsonReceived', respJson);
    // respJson.recipe
    const { portions, ingredients, priceTotal, caloriesTotal, name, image, instructions } = respJson.recipe

    this.setState(() => ({
      defaultPortions: portions,
      portions,
      ingredients,
      priceTotal,
      caloriesTotal,
      name,
      image,
      instructions
    }));

  }

  countTotalCalories() {
    let ratio = this.state.portions / this.state.defaultPortions;
    let totalCalories = 0
    this.state.ingredients.map((ingredient) => {
      totalCalories += ingredient.calories * ingredient.inputWeight * ratio / 100
    })
    return Math.round(totalCalories)
  }

  countTotalPrice() {
    let ratio = this.state.portions / this.state.defaultPortions;
    let totalPrice = 0
    this.state.ingredients.map((ingredient) => {
      let quantity = Math.ceil(ingredient.inputWeight * ratio / ingredient.weight)

      totalPrice += ingredient.price * quantity
    })
    return Math.round(totalPrice)
  }

  async setPortions(value) {
    await this.setState(() => ({ portions: value }));
    // const ratio = this.state.portions / this.state.defaultPortions;

    this.setState(() => ({ caloriesTotal: this.countTotalCalories() }));
    this.setState(() => ({ priceTotal: this.countTotalPrice() }));


  }

  render() {
    return (
      // export default () => (
      <Grommet full theme={grommet}      >
        <Grid
          rows={['xsmall', 'flex', 'xsmall', 'small']}
          // columns={["3/5", "2/5"]}
          columns={['1/4', 'flex']}
          areas={[
            ['header', 'header'],
            ['photo', 'ingredients'],
            ['info', 'sizeChooser'],
            ['footer', 'footer'],
          ]}
          gap="small"
        >
          <Box background="brand" gridArea="header">

            <Heading margin="small">{this.state.name}</Heading>
          </Box>

          <Box gridArea="photo">
            {/* <Grommet theme={grommet}> */}
            <Image src={this.state.image} />
            {/* </Grommet> */}
          </Box>

          <Box background="light-2" gridArea="ingredients">
            <IngredientsList defaultPortions={this.state.defaultPortions} portions={this.state.portions} ingredients={this.state.ingredients} />
          </Box>

          <Box justify="around" animation="fadeIn" direction="row" gridArea="info" >

            <LabelledMeter meterValue={this.state.caloriesTotal} meterType={'Ккал'} />
            <LabelledMeter meterValue={this.state.priceTotal} meterType={'Руб'} />
          </Box>
          <Box width="250px" gridArea="sizeChooser" >
            Выберите размер блюда
            {/* <SizeChooser value={6} /> */}
            <NumberInput
              min={1}
              max={12}
              value={this.state.portions}
              suffix="  порций"
              onChange={({ target: { value } }) => this.setPortions(value)}
            />
          </Box>

          <Box animation="slideDown" align="start" gridArea="footer">
            <InstructionsList list={this.state.instructions} />
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
