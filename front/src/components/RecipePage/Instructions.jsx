import React, { Component } from 'react';

import { Grommet, Box, List,Heading } from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { render } from "react-dom";

const theme = deepMerge(grommet, {
  list: {
    item: {
      pad: { horizontal: "large", vertical: "xsmall" },
      background: ["white", "light-2"],
      border: true,
    }
  }
});

export default class InstructionsList extends Component {
  render() {
    const { list } = this.props;
    return (
      <Grommet theme={theme}>
        <Box align="center" pad="small">
          <Heading margin="small">Инструкции: </Heading>
          <List data={list} />
        </Box>
      </Grommet>
    );
  }
}