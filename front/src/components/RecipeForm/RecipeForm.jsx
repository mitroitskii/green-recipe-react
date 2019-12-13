import React from 'react';
import { TextInput } from 'grommet';

export default function RecipeForm() {
const [value, setValue] = React.useState('');
  return (
    <TextInput
      placeholder="type here"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  );  
}