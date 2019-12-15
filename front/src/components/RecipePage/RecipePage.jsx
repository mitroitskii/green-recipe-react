import { Grommet, Box, Grid } from "grommet";
import { grommet } from "grommet/themes";
import React from 'react';

export default () => {
  return (
    <Grommet full theme={grommet}>
      <Grid
        rows={["xsmall", "medium","xsmall", "small"]}
        // columns={["3/5", "2/5"]}
        columns={["3/5", "2/5"]}
        areas={[
          ["header", "header"],
          ["photo", "ingredients"],
          ["info", "sizeChooser"],
          ["footer", "footer"]
        ]}
        gap="medium"
      >
        <Box background="brand" gridArea="header">
          Страница с рецептом
        </Box>

        <Box background="light-5" gridArea="photo">
          Recipe photo
        </Box>

        <Box background="light-2" gridArea="ingredients">
          Ingredients
        </Box>

        <Box background="light-2" gridArea="info">
          info
        </Box>
        <Box background="light-2" gridArea="sizeChooser">
          sizeChooser
        </Box>

        <Box background="dark-6" gridArea="footer">
          Инструкции
        </Box>
      </Grid>
    </Grommet>
  );
};
