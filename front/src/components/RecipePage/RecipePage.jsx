import {
  Grommet,
  Box,
  Grid,
  Image,
  Heading,
  Text,
  Anchor,
  Paragraph
} from "grommet";
import { grommet } from "grommet/themes";
import { NumberInput } from "grommet-controls";
import React, { Component } from "react";
import InstructionsList from "./Instructions";
import IngredientsList from "./IngredientsList";
import LabelledMeter from "./Meter";
import "./Ingredients.css";

// const { RecipeExample } = require('./RecipeExample');

export default class RecipePage extends Component {
  state = {
    defaultPortions: 0,
    portions: 0,
    ingredients: [],
    priceTotal: 0,
    caloriesTotal: 0,
    name: "",
    image: "",
    instructions: [],
    hours: "",
    minutes: ""
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    // console.log("id of page", id);
    // const testId = '5df87e189fb92116d2af03c4';
    const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
    const respJson = await response.json();
    // console.log('respJsonReceived', respJson);
    // respJson.recipe
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
      priceTotal,
      caloriesTotal,
      name,
      image,
      hours,
      minutes,
      authorName,
      category,
      author,
      // image: 'http://localhost:5000/uploadssimple/e49d63ab434fb425c01e359bee93116e',
      // image: 'http://localhost:5000/api/uploads/1576595592679weatherpics.jpg',
      instructions // {id,  text} id text
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
    // const ratio = this.state.portions / this.state.defaultPortions;

    this.setState(() => ({ caloriesTotal: this.countTotalCalories() }));
    this.setState(() => ({ priceTotal: this.countTotalPrice() }));
  }

  render() {
    return (
      <Box
        direction="column"
        width="100%"
        justify="center"
        align="center"
        
      >

      

      
      {/* //   rows={["small", "flex", "xsmall", "small"]}
      //   // columns={["3/5", "2/5"]}
      //   columns={["flex", "flex"]}
      //   areas={[
        //     ["header", "header"],
        //     ["photo", "ingredients"],
      //     ["info", "sizeChooser"],
      //     ["footer", "footer"]
      //   ]}
      //   gap="small"
      // > */}
      <Box
      // elevation="medium"
      direction="column"
          animation="fadeIn"
           width="100%"
        >
          <Heading level={5}>Автор: {this.state.category}</Heading>
      
          <Heading level={2}>{this.state.name}</Heading>
          <Heading level={3}>Автор: {this.state.authorName}</Heading>
        </Box>

        <Box width="100%"
          // elevation="medium"
          animation="fadeIn" >
          <Image
            height="100%"
            width="100%"
            elevation="medium"
            src={this.state.image}
            />
        </Box>

        <Box
          // elevation="medium"
           width="100%"
          animation="fadeIn" >
          <IngredientsList
            defaultPortions={this.state.defaultPortions}
            portions={this.state.portions}
            ingredients={this.state.ingredients}
            />
        </Box>

        <Box
           width="100%"
          justify="around"
          animation="fadeIn"
          direction="row"
          // elevation="medium"
          >
          <LabelledMeter
            infoRecipe
            meterValue={this.state.caloriesTotal}
            meterType={"Ккал"}
            />
          <LabelledMeter
            meterValue={this.state.priceTotal}
            meterType={"Рублей"}
            />
          {/* <LabelledMeter meterValue={`${this.state.hours}:${this.state.minutes}`} meterType={'Минут'} /> */}
          <LabelledMeter
            meterValue={
              parseFloat(this.state.hours) * 60 + parseFloat(this.state.minutes)
            }
            meterType={"Минут"}
            />
        </Box>
        <Box
          // elevation="medium"
           width="100%"
          direction="row"
          animation="fadeIn"
          >
          <div>
            Выберите размер блюда
            {/* <SizeChooser value={6} /> */}
            <NumberInput
              min={1}
              max={12}
              value={this.state.portions}
              suffix="  порций"
              onChange={({ target: { value } }) => this.setPortions(value)}
              />
          </div>

          <Paragraph>
            Посмотрите другие блюда в категории{" "}
            <Anchor label={this.state.category} href="/recipes" />
          </Paragraph>
        </Box>

        <Box
           width="100%"
          // elevation="medium"
          animation="fadeIn"
          align="start"
          >
          <Heading level={3}>Инструкции:</Heading>

          {this.state.instructions.map((el, index) => (
            <Text key={el.id}>
              {index + 1}. {el.text}
            </Text>
          ))}
        </Box>
          </Box>
    );
  }
}
