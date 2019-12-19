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
    minutes: "",
    portionCaption: "порции"
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
      priceTotal: Math.round(priceTotal),
      caloriesTotal: Math.round(caloriesTotal),
      name,
      image,
      hours,
      minutes,
      authorName,
      category,
      author,
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

    this.setState(() => ({ caloriesTotal: this.countTotalCalories() }));
    this.setState(() => ({ priceTotal: this.countTotalPrice() }));

    if (parseFloat(value) === 1) {
      this.setState(() => ({ portionCaption: "порция" }));
    } else if (parseFloat(value) > 4) {
      this.setState(() => ({ portionCaption: "порций" }));
    } else {
      this.setState(() => ({ portionCaption: "порции" }));
    }
  }

  render() {
    return (
      <Box elevation="medium" direction="column" width="80%" gap="medium">
        <Box
          direction="column"
          animation="fadeIn"
          // justify="center"
          width="100%"
        >
          <Anchor
            className="testText"
            margin={{
              top: "small"
            }}
            alignSelf="center"
            label={this.state.category}
            href="/recipes"
          />

          <Heading
            className="headerStyle"
            margin={{
              bottom: "small",
              top: "medium"
            }}
            alignSelf="center"
            level={1}
          >
            {this.state.name}
          </Heading>

          <Heading
            className="author"
            alignSelf="center"
            margin={{
              bottom: "none"
            }}
            level={4}
          >
            Автор: {this.state.authorName}
          </Heading>
        </Box>

        <Box
          width="100%"
          elevation="medium"
          alignSelf="center"
          animation="fadeIn"
          // background={{
          //   "image" : this.state.image
          // }}
          // round="large"
          // border-radius="48px"
        >
          <Image
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
            meterType={"Ккал"}
          />
          <LabelledMeter
            meterValue={
              parseFloat(this.state.hours) * 60 + parseFloat(this.state.minutes)
            }
            meterType={"Минут"}
          />
          <LabelledMeter
            meterValue={parseFloat(this.state.priceTotal)}
            meterType={"Рублей"}
          />
        </Box>
        <Box
          // elevation="medium"
          width="100%"
          direction="row"
          animation="fadeIn"
          align="center"
          justify="between"
        >
          <Box
            className="testText"
            direction="row"
            // width="100%"
            // align="center"
            justify="start"
            // elevation="medium"
            margin={{
              left: "large"
              // top:"none"
              // right: "large"
            }}
          >
            <Heading
              margin={{
                // left: "large"
                top: "small",
                bottom: "medium"
                // right: "large"
              }}
              level={3}
            >
              Ингредиенты:
            </Heading>
            {/* Ингредиенты */}
          </Box>
          <Box
            margin={{
              // left: "large"
              right: "large"
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
          elevation="medium"
          width="100"
          animation="fadeIn"
          margin={{
            left: "large",
            right: "large"
          }}
        >
          <IngredientsList
            defaultPortions={parseFloat(this.state.defaultPortions)}
            portions={parseFloat(this.state.portions)}
            ingredients={this.state.ingredients}
          />
        </Box>

        <Box
          width="100"
          animation="fadeIn"
          margin={{
            left: "large",
            right: "large"
          }}
        >
          <Heading
            margin={{
              // left: "large"
              top: "small"
              // bottom: "small"
              // right: "large"
            }}
            level={3}
          >
            Инструкции:
          </Heading>

          {this.state.instructions.map((ingredient, index) => (
            <>
              <Text className="testText" key={ingredient.id}>
                {index + 1}. {ingredient.text}
              </Text>
              <br />
            </>
          ))}
        </Box>
      </Box>
    );
  }
}
