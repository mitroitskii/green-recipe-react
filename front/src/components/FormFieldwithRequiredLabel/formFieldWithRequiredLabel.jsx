import React from 'react';
import { Box, Text, FormField } from 'grommet';

const FormFieldLabel = props => {
  const { required, label, ...rest } = props;
  return (
    <FormField 
      label={
        required ? (
          <Box direction="row" width="265px">
            <Text>{label}</Text>
            <Text color="status-critical">*</Text>
          </Box>
        ) : (
          label
        )
      }
      required={required}
      {...rest}
    />
  );
};
export default FormFieldLabel