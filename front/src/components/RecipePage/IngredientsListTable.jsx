/* eslint-disable react/prefer-stateless-function */
import { Anchor } from 'grommet';
import React from 'react';
import './Ingredients.css';
// import { connect } from 'react-redux';

// import { logoutFetchAC } from '../../redux/actions/actions';

// p margin 0 + margin bottom li

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
                  // className="singleLineContent"
                  // alignSelf="center"
                  label={ingredient.name}
                  href={ingredient.link}
                  target="_blank"
                />
              </td>
              <td className="centered ">
                {/* <strong> */}
                {Math.round(ingredient.inputWeight * ratio)}
                {/* </strong> */}
              </td>
              <td className="centered">
                {Math.round(
                  (ingredient.calories * ingredient.inputWeight * ratio) / 100
                )}
              </td>
              <td className="centered">
                {/* <strong> */}
                {Math.ceil(
                  (ingredient.inputWeight * ratio) / ingredient.weight
                ) * ingredient.price}
                {/* </strong> */}
              </td>

              <td className="centered">
                {/* <strong> */}
                {Math.ceil(
                  (ingredient.inputWeight * ratio) / ingredient.weight
                )}
                {/* </strong> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

// function mapStateToProps(store) {
//   //   return {
//   //     isLoggedIn: store.isLoggedIn,
//   //   };
// }

// function mapDispatchToProps(dispatch) {
//   //   return {
//   //     logoutFetch: () => dispatch(logoutFetchAC()),
//   //   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
