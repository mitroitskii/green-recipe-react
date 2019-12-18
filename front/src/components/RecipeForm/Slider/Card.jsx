import React from 'react';
import { Box, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

import './Card.css';

export default class IngredientCard extends React.Component {
  handleClick = () => {
    const {
      ingredient,
      ingredients,
      setIngredients,
      setPriceTotal,
      setCaloriesTotal,
      setSearch,
      errors,
      setError
    } = this.props;
    const updatedIngredients = ingredients.concat([ingredient]);
    ingredient.priceTotal = ingredient.quantity * ingredient.price;
    ingredient.caloriesTotal = (ingredient.weight / 100) * ingredient.calories;
    ingredient.inputWeight = ingredient.weight;
    setIngredients(updatedIngredients);
    setCaloriesTotal(
      ingredients.reduce((acc, ingr) => acc + ingr.caloriesTotal, 0),
    );
    setPriceTotal(
      ingredients.reduce((acc, ingr) => acc + ingr.priceTotal, 0),
    );
    setError({ ...errors, ingredients: '' });
    setSearch('');
  };
  render() {
    return (
      <Box
        width={String(this.props.cardWidth) + 'px'}
        height={String(this.props.cardHeight + 'px')}
        className={'wrapper'}
      >
        <Box direction="column" height="100%" width="100%">
          <Box
            height="100%"
            width="100%"
            background={{
              image: `url(${this.props.ingredient.imageLink})`,
              position: 'center'
            }}
          />
          <Box
            className={'bottom'}
            direction="row-responsive"
            height="35%"
            width="100%"
          >
            <Box
              className={'details'}
              height="100%"
              width="70%"
              direction="column"
              align="center"
              pad="1px"
            >
              <Box>
                <Box width="100%">
                  <marquee
                    behavior="alternate"
                    scrollamount="2"
                    direction="right"
                  >
                    <Text size="medium" textAlign="start" width="100%">
                      {' '}
                      {this.props.ingredient.name}
                    </Text>
                  </marquee>
                </Box>
              </Box>
              <Text size="medium">
                Цена: {this.props.ingredient.price}{' '}
                {this.props.ingredient.currency}.
              </Text>
              <Text size="medium">
                Вес: {this.props.ingredient.weight}{' '}
                {this.props.ingredient.measureType}.
              </Text>
            </Box>
            <Box
              fit="content"
              align="center"
              direction="column"
              justify="center"
              border={[{ side: 'left' }]}
              hoverIndicator
              onClick={this.handleClick}
            >
              <AddCircle size="medium" />
                <Text size="small" textAlign="center" >
                  Добавить в рецепт
                </Text>
            </Box>
            {/* <Button icon={<AddCircle size="large" />} fit="content" align="center" justify="center" label="Добавить в рецепт" onClick={handleClick} /> */}
          </Box>
        </Box>
        {/* <div className={"inside"}>
                    <div className={"icon"}><i className={"material-icons"}>info</i></div>
                    <div className={"contents"}>
                        информация о товаре
                        </div>
                </div> */}
      </Box>
    );
  }
}
