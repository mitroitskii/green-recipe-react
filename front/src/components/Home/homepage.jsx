import React from 'react';
import RecipeList from '../RecipeList';
import { Box } from 'grommet';

export default function Home() {
  return (
    <Box width='80%' elevation='medium' justify='center' align='center'>
      <RecipeList />
    </Box>
  );
}

