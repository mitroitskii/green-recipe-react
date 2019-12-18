import React from 'react';
import { TextArea } from 'grommet';

export default function Instructions(props) {
  const { setInstructions } = props;
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
