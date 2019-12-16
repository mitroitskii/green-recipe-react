import { Grommet, Box, Grid, Image, Heading, } from 'grommet';
import { grommet } from 'grommet/themes';
import { NumberInput } from 'grommet-controls';
import React, { Component } from 'react';
import InstructionsList from './Instructions';
import IngredientsList from "./IngredientsList"
import LabelledMeter from './Meter';

const { RecipeExample } = require('./RecipeExample');

export default class RecipePage extends Component {

  state = {
    defaultPortions:RecipeExample.portions,
    portions: RecipeExample.portions,
    ingredients: RecipeExample.ingredients,
    priceTotal: RecipeExample.priceTotal,
    caloriesTotal: RecipeExample.caloriesTotal,
    
  }

  async componentDidMount() {
    const testId = '5df38fa342403c7b25a04d2d';
    const response = await fetch(`http://localhost:5000/api/recipes/${testId}`);
    const respJson = await response.json();
    console.log('respJsonReceived', respJson);

  }

  countTotalCalories() {
    let ratio = this.state.portions / this.state.defaultPortions;
    let totalCalories=0
    this.state.ingredients.map((ingredient) => {
      totalCalories+=ingredient.calories * ingredient.inputWeight * ratio / 100
    })
    return totalCalories
  }

  countTotalPrice() {
    let ratio = this.state.portions / this.state.defaultPortions;
    let totalPrice=0
    this.state.ingredients.map((ingredient) => {
      let quantity = Math.ceil(ingredient.inputWeight * ratio / ingredient.weight)
      
      totalPrice+=ingredient.price*quantity
    })
    return totalPrice
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

            <Heading margin="small">{RecipeExample.name}</Heading>
          </Box>

          <Box gridArea="photo">
            {/* <Grommet theme={grommet}> */}
            <Image src={RecipeExample.image} />
            {/* </Grommet> */}
          </Box>

          <Box background="light-2" gridArea="ingredients">
            <IngredientsList defaultPortions={this.state.defaultPortions} portions={this.state.portions} ingredients={this.state.ingredients} />
          </Box>

          <Box justify="around" animation="fadeIn" direction="row" gridArea="info" >

            <LabelledMeter meterValue={this.state.caloriesTotal} meterType={'Ккал'} />
            <LabelledMeter meterValue={this.state.priceTotal} meterType={'Руб'} />
          </Box>
          <Box width = "250px" gridArea="sizeChooser" >
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
            <InstructionsList list={RecipeExample.instructions} />
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
