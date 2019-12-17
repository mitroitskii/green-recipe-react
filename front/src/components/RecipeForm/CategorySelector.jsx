import React, { Component } from 'react';
import { Box, Button, Select, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

const Categories = [
  'Супы',
  'Каши',
  'Вторые блюда',
  'Русская кухная',
  'Мексика',
  'Соусы',
  'Просто и вкусно'
];

export default class CategorySelector extends Component {
  state = {
    selected: []
  };

  onRemoveSelected = season => {
    const seasonIndex = Categories.indexOf(season);
    const selected = (this.state.selected.filter(
      selectedSeason => selectedSeason !== seasonIndex
    ));
    this.setState({ selected });
  };

  setSelected = nextSelected => {
    this.setState({ selected: [...nextSelected].sort() });
  };

  renderCategory = season => (
    <Button
      key={`season_tag_${season}`}
      href="#"
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        this.onRemoveSelected(season);
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
          {season}
        </Text>
        <Box background="white" round="full" margin={{ left: 'xsmall' }}>
          <FormClose
            color="accent-1"
            size="small"
            style={{ width: '12px', height: '12px' }}
          />
        </Box>
      </Box>
    </Button>
  );

  renderOption = (option, state) => (
    <Box pad="small" background={state.active ? 'active' : undefined}>
      {option}
    </Box>
  );

  render() {
    return (
      <Box fill align="start" justify="center">
        <Select
          closeOnChange={false}
          multiple
          value={
            <Box wrap direction="row" width="medium">
              {this.state.selected && this.state.selected.length ? (
                this.state.selected.map(index =>
                  this.renderCategory(Categories[index])
                )
              ) : (
                <Box
                  pad={{ vertical: 'xsmall', horizontal: 'small' }}
                  margin="xsmall"
                >
                  Выберите категорию блюда
                </Box>
              )}
            </Box>
          }
          options={Categories}
          selected={this.state.selected}
          disabled={[2, 6]}
          onChange={({ selected: nextSelected }) => {
            this.setSelected(nextSelected);
          }}
        >
          {this.renderOption}
        </Select>
      </Box>
    );
  }
}
