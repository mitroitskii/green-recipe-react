import React, { Component } from 'react';
import { Select } from 'grommet';


const OPTIONS = ["1", "2", "3","4","5","6","7","8","9","10"];
export default class SizeChooser extends Component {
   state = { value: this.props.value, options: OPTIONS }

  render() {
    const { options, value } = this.state;
    return (
        <Select
          // multiple={true}
          value={value}
          onSearch={(searchText) => {
            const regexp = new RegExp(searchText, 'i');
            this.setState({ options: OPTIONS.filter(o => o.match(regexp)) });
          }}
          onChange={event => this.setState({
            value: event.value,
            options: OPTIONS,
          })}
          options={options}
        />
    );
  }
}
