import React from 'react';
import { Box, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

import './ingredientCard.css';

export default class IngredientCard extends React.Component {
  handleClick() {
    const updatedIngredients = this.props.ingredients.concat([
      this.props.ingredient,
    ]);
    this.props.setIngredients(updatedIngredients);
  }
  render() {
    const style = {
      width: '100%',
    };
    return (
      <Box className={'wrapper'}>
        <Box direction="column" height="100%" width="100%">
          <Box
            height="100%"
            width="100%"
            background={{
              image: `url(${this.props.ingredient.imageLink})`,
              position: 'center',
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
              justify="center"
              align="center"
              pad="10px"
              position="fixed"
            >
              <Box>
                <marquee
                  behavior="alternate"
                  scrollamount="2"
                  direction="right"
                >
                  <Text style={style} alignSelf="center" size="xlarge">
                    {' '}
                    {this.props.ingredient.name}
                  </Text>
                </marquee>
              </Box>
              <Text style={style} alignSelf="center" size="large">
                Цена: {this.props.ingredient.price}
              </Text>
              <Text style={style} alignSelf="center" size="large">
                Вес: {this.props.ingredient.weight}
              </Text>
            </Box>
            <Box
              fit="content"
              align="center"
              justify="center"
              onClick={this.handleClick}
            >
              <AddCircle size="large" />
              Добавить в рецепт
            </Box>
            <div className={'inside'}>
              <div className={'icon'}>
                <i className={'material-icons'}>info</i>
              </div>
              <div className={'contents'}>информация о товаре</div>
            </div>
          </Box>
        </Box>
      </Box>
    );
  }
}
