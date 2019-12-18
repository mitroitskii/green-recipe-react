import React from 'react';
import { Image, Box } from 'grommet';
import gif from './spinner.gif';

const preLoader = () => (
  // вернуть инструкции по желанию
  <Box width="200px" height="200px">
    <Image src={gif} />
  </Box>
);

export default preLoader;
