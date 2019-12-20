import uuidv1 from 'uuid/v1';
import React from 'react';
import { TextArea, Box, TextInput, Button, Paragraph } from 'grommet';
import { FormClose } from 'grommet-icons';

export default class Instruction extends React.Component {
  state = { newID: '' };
  componentDidMount() {
    const newID = uuidv1();
    this.setState({ newID });
  }
  render() {
    const {
      instruction,
      instructions,
      setInstructions,
      errors,
      setError,
      index
    } = this.props;
    return (
      <Box
        alignSelf="center"
        direction="row"
        round="small"
        // elevation="small"
        fill={false}
        flex="grow"
        margin={{ vertical: '0px' }}
        width={{ min: '800px', max: '800px' }}
      >
        <Box
          hoverIndicator
          height="50px"
          focusIndicator={true}
          // align="center"
          direction="row"
          // gap="xsmall"
          // pad={{ vertical: '0px', horizontal: '43px' }}
          margin={{ vertical: '0px', horizontal: '10px' }}
          // width={{ min: '140px', max: '140px' }}
          // background="accent-1"
          round="small"
        // elevation="small"
        >
        <Paragraph
          // margin={{
          //   vertical: 'medium',
          //   horizontal: '...',
          //   top: 'large',
          //   bottom: '...',
          //   left: '...',
          //   right: '...'
          // }}
          className="bold"
          alignSelf="center"
          size="large"
          responsive={true}
          textAlign="center"
        >
          {index + 1}
        </Paragraph>
        </Box>
        <Box
          hoverIndicator
          height="50px"
          width="700px"
          focusIndicator={true}
          // align="center"
          direction="row"
          // gap="xsmall"
          // pad={{ vertical: '0px', horizontal: '43px' }}
          margin={{ vertical: '0px', horizontal: '10px' }}
          // width={{ min: '140px', max: '140px' }}
          // background="accent-1"
          round="small"
          // elevation="small"
        >
          <TextArea
            className="input"
            plain={true}
            fill={true}
            resize={false}
            // size="medium"
            placeholder={`Введите инструкции для шага ${index + 1}`}
            value={instruction.text}
            onChange={({ target: { value } }) => {
              setError({ ...errors, instructions: '' });
              if (
                value.length > 3 &&
                instructions[instructions.length - 1].id != this.state.newID
              ) {
                const newInstructions = instructions.map(instr => {
                  if (instr.id === instruction.id) {
                    instr.text = value;
                  }
                  return instr;
                });
                if (newInstructions[newInstructions.length - 1].text !== '') {
                  newInstructions.push({ id: this.state.newID, text: '' });
                }
                setInstructions(newInstructions);
                console.log(this.state.newID);
              } else {
                setInstructions(
                  instructions.map(instr => {
                    if (instr.id === instruction.id) {
                      instr.text = value;
                    }
                    return instr;
                  })
                );
              }
            }}
          />
        </Box>
        {instructions.length > 1 && (
          <Box
            // wrap
            // direction="row"
            // width="small"
            // round="full"
            // margin={{ left: 'xsmall' }}
            hoverIndicator={false}
            height="50px"
            focusIndicator={true}
            // align="center"
            direction="row"
            // gap="xsmall"
            // pad={{ vertical: '0px', horizontal: '43px' }}
            margin={{ vertical: '10px', horizontal: '10px' }}
            // width={{ min: '140px', max: '140px' }}
            // background="accent-1"
            round="small"
        // elevation="small"
          >
            <Button
              href="#"
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                const newInstructions = instructions.filter(
                  instr => instr.id !== instruction.id
                );
                setInstructions(newInstructions);
              }}
              onFocus={event => event.stopPropagation()}
            >
              <Box
                background="accent-1"
                round="full"
                margin={{ left: 'xsmall' }}
              >
                <FormClose
                  color="white"
                  size="small"
                  style={{ width: '25px', height: '25px' }}
                />
              </Box>
            </Button>
          </Box>
        )}
      </Box>
    );
  }
}
