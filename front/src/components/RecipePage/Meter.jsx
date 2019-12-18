import React, { Component } from 'react';

import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export default class LabelledMeter extends Component {
  render() {
    const { meterValue, meterType } = this.props;

    return (
      // <Grommet theme={grommet}>
        <Box align="start" >
          <Stack anchor="center">
            <Meter
              type="circle"
              background="light-2"
              values={[{ value: meterValue }]}
              size="xsmall"
              thickness="small"
            />
            <Box direction="column" align="center" pad={{ bottom: 'small' }}>
              <Text size="large" weight="bold">
                {meterValue}
              </Text>
              <Text size="small">{meterType}</Text>
            </Box>
          </Stack>
        </Box>
      // </Grommet>
    );
  }
}
