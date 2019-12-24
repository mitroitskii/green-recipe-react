import React from 'react';
import { Image, Box } from 'grommet';
import { Spinning } from 'grommet-controls';

const preLoader = () => (
  // вернуть инструкции по желанию
  <Box width="200px" height="200px" justify="center" align="center">
    <Spinning kind="wave" color="#2ad2c9" size="small" />
  </Box>
);

export default preLoader;
