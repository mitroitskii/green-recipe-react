import React, { useState } from 'react';
import { Box, TextInput, Button, Text } from 'grommet';

export default function Search (props) {
  const { setSearch } = props;
  const [value, setValue] = useState('');
  return (
    <>
      <TextInput
        placeholder="Введите название ингредиента"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Box wrap direction="row" width="small">
        <Button
          href="#"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setSearch(value);
            // props.setOpen(!(props.open))
          }}
          onFocus={event => event.stopPropagation()}  
        >
          <Box
            align="center"
            direction="row"
            gap="xsmall"
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
            margin="xsmall"
            background="accent-1"
            round="large"
          >
            <Text size="small" color="white">
              Найти
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );
}
