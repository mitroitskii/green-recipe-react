import React from 'react';
import { Box, Button, Text } from 'grommet';

export default function Submit(props) {
  return (
    <Box wrap direction="row" width="small">
      <Button
        href="#"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          props.clickSubmit();
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
            {props.name}
          </Text>
        </Box>
      </Button>
    </Box>
  );
}
