import React, { useState } from 'react';
import { Box, TextArea } from 'grommet';

export default function Instruction(props) {
  const { instructions, setInstructions } = props;
  return (
    <TextArea
      fill
      resize={false}
      size="medium"
      onChange={({ target: { value } }) => {
        const array = [];
        array[0] = value;
        setInstructions(array);
      }}
    />
  );
}
