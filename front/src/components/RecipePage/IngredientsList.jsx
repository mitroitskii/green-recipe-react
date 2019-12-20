import { Anchor } from 'grommet';
import React from 'react';
import './Ingredients.css';
// import { connect } from 'react-redux';

// import { logoutFetchAC } from '../../redux/actions/actions';

// p margin 0 + margin bottom li

export default class IngredientsList extends React.Component {
  render() {
    const { ingredients, portions, defaultPortions } = this.props;

    const ratio = portions / defaultPortions;
    // иметь ввиду что тут не мняется quantity ингредиента,
    // рендерим корректно но не меняя свойство каждого ингредиента
    return (
      <ul className="ingredientsUL">
        {ingredients.map(ingredient => (
          <li key={ingredient.id} className="ingredinetsList testText">
            {' '}
            <div className="singleLineContent">
              {/* <p>{ingredient.name}{' '}</p> */}
              {/* <a href={ingredient.link}>{ingredient.name}</a> */}
              <Anchor
                // margin={{
                // left: 'small',
                // }}
                alignSelf="center"
                label={ingredient.name}
                href={ingredient.link}
              />

              <p>
                {'Вес:'}{' '}
                <strong>
                  {`${Math.round(ingredient.inputWeight * ratio)}`}
                </strong>
                {` гр Ккал: ${Math.round(
                  (ingredient.calories * ingredient.inputWeight * ratio) / 100
                )} 
              Цена:`}
                <strong>
                  {` ${Math.ceil(
                    (ingredient.inputWeight * ratio) / ingredient.weight
                  ) * ingredient.price} `}{' '}
                </strong>{' '}
                {`
              руб Шт:`}
                <strong>
                  {`  ${Math.ceil(
                    (ingredient.inputWeight * ratio) / ingredient.weight
                  )}`}{' '}
                </strong>
              </p>
            </div>
          </li>
        ))}
        {/* <li  /> */}
      </ul>
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
