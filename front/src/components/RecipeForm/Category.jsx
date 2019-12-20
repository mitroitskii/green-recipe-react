import React, { useState } from 'react';
import { Box, Select } from 'grommet';

const categories = [
  'Холодная закуска',
  'Горячая закуска',
  'Суп',
  'Горячее блюдо',
  'Салат',
  'Каша',
  'Паста',
  'Десерт'
];

export default function Category(props) {
  const [options, setOptions] = useState(categories);
  const { category, setCategory, errors, setError } = props;
  return (
    <Box fill align="start" justify="center">
      <Select
        id="category"
        className="input"
        name="category"
        size="medium"
        placeholder="Выберите категорию блюда"
        dropHeight="small"
        value={category}
        options={options}
        onChange={({ option }) => {
          setError({ ...errors, category: '' });
          setCategory(option);
        }}
        // onClose={() => setOptions(categories)}
        // onSearch={text => {
        //   // The line below escapes regular expression special characters:
        //   // [ \ ^ $ . | ? * + ( )
        //   const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

        //   // Create the regular expression with modified value which
        //   // handles escaping special characters. Without escaping special
        //   // characters, errors will appear in the console
        //   const exp = new RegExp(escapedText, 'i');
        //   setOptions(categories.filter(o => exp.test(o)));
        // }}
      />
    </Box>
  );
}
