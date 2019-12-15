import { Grommet, Box, Grid,Image,Heading } from "grommet";
import { grommet } from "grommet/themes";
import React from "react";
import InstructionsList from './Instructions'
import LabelledMeter from './Meter'
const {RecipeExample} = require("./RecipeExample");

// const {InstructionsList} = require("./Instructions");


export default () => {
  return (
    <Grommet full theme={grommet}>
      <Grid
        rows={["xsmall", "flex", "xsmall", "small"]}
        // columns={["3/5", "2/5"]}
        columns={["flex", "flex"]}
        areas={[
          ["header", "header"],
          ["photo", "ingredients"],
          ["info", "sizeChooser"],
          ["footer", "footer"]
        ]}
        gap="small"
      >
        <Box background="brand" gridArea="header">
        
        <Heading margin="small">{RecipeExample.name}</Heading>
        </Box>

        <Box gridArea="photo">
          {/* Recipe photo */}
          {/* <Grommet theme={grommet}> */}
            {/* <Image src="//v2.grommet.io/assets/IMG_4245.jpg" /> */}
            {/* <Image src="https://vkusvill.ru/upload/resize/94964/94964_530x300x85_c.jpg" /> */}
            <Image src={RecipeExample.image} />


          {/* </Grommet> */}
        </Box>

        <Box background="light-2" gridArea="ingredients">
          Ingredients
        </Box>

        <Box justify = "around" animation='fadeIn' direction="row" gridArea="info" >
          
          <LabelledMeter meterValue={RecipeExample.caloriesTotal} meterType={'Ккал'}  />
          <LabelledMeter meterValue={RecipeExample.priceTotal} meterType={'Руб'}  />
        </Box>
        <Box  background="light-2" gridArea="sizeChooser">
          sizeChooser
        </Box>

        <Box  animation='slideDown'  align="start" gridArea="footer">
          {/* Инструкции */}
          <InstructionsList list={RecipeExample.instructions}/>
        </Box>
      </Grid>
    </Grommet>
  );
};
