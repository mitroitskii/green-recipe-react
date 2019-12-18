import React, { useState } from 'react';
import { Box, Select } from 'grommet';

const categories = [
  'Суп',
  'Салат',
  'Каша',
  'Паста',
  'Холодная закуска',
  'Горячая закуска',
  'Десерт'
];

export default function Category(props) {
  const [options, setOptions] = useState(categories);
  const { category, setCategory } = props;
  return (
    <Box fill align="start" justify="center">
      <Select
        size="medium"
        placeholder="Выберите категорию блюда"
        value={category}
        options={options}
        onChange={({ option }) => setCategory(option)}
        onClose={() => setOptions(categories)}
        onSearch={text => {
          // The line below escapes regular expression special characters:
          // [ \ ^ $ . | ? * + ( )
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, 'i');
          setOptions(categories.filter(o => exp.test(o)));
        }}
      />
    </Box>
  );
}
