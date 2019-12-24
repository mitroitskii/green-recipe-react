import { Anchor } from 'grommet';
import React from 'react';
import './Ingredients.css';

export default class IngredientsListTable extends React.Component {
  render() {
    const { ingredients, portions, defaultPortions } = this.props;

    const ratio = portions / defaultPortions;
    // иметь ввиду что тут не мняется quantity ингредиента,
    // рендерим корректно но не меняя свойство каждого ингредиента
    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>Вес</th>
            <th>Ккал</th>
            <th>Цена</th>
            <th>Шт</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ingredient => (
            <tr key={ingredient.id} className="testText ">
              <td className="paddingTd">
                <Anchor
                  label={ingredient.name}
                  href={ingredient.link}
                  target="_blank"
                />
              </td>
              <td className="centered ">
                {Math.round(ingredient.inputWeight * ratio)}
              </td>
              <td className="centered">
                {Math.round(
                  (ingredient.calories * ingredient.inputWeight * ratio) / 100,
                )}
              </td>
              <td className="centered">
                {Math.ceil(
                  (ingredient.inputWeight * ratio) / ingredient.weight,
                ) * ingredient.price}
              </td>

              <td className="centered">
                {Math.ceil(
                  (ingredient.inputWeight * ratio) / ingredient.weight,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
