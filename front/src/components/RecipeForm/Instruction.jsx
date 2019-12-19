import uuidv1 from 'uuid/v1';
import React from 'react';
import { TextArea, Box, TextInput, Button } from 'grommet';
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
      <Box>
        <TextArea
          fill
          resize={false}
          size="medium"
          placeholder={`Введите инструкции для шага ${index + 1}`}
          value={instruction.text}
          onChange={({ target: { value } }) => {
            setError({ ...errors, instructions: '' });
            if (
              value.length > 5 &&
              instructions[instructions.length - 1].id != this.state.newID
            ) {
              const newInstructions = instructions.map(instr => {
                if (instr.id === instruction.id) {
                  instr.text = value;
                }
                return instr;
              });
              newInstructions.push({ id: this.state.newID, text: '' });
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
        {instructions.length > 1 && (
          <Box
            wrap
            direction="row"
            width="small"
            round="full"
            margin={{ left: 'xsmall' }}
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
