import React from 'react';
import { Box, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

import './Card.css';

import { connect } from 'react-redux'
import { setCardDimensionsAC } from '../../../redux/actions/actions';

export default class IngredientCard extends React.Component {
  handleClick = () => {
    const updatedIngredients = this.props.ingredients.concat([this.props.ingredient]);
    this.props.setIngredients(updatedIngredients);
    // this.props.setOpen(!(this.props.open))
    this.props.setSearch('');
  };
  render() {
    return (
      <Box width={String(this.props.cardWidth) + "px"} height={String(this.props.cardHeight + "px")} className={'wrapper'}>
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
                  <marquee behavior="alternate" scrollamount="2" direction="right">
                    <Text size="medium" textAlign="start" width="100%">
                      {' '}
                      {this.props.ingredient.name}
                    </Text>
                  </marquee>
                </Box>
              </Box>
              <Text size="medium">
                Цена: {this.props.ingredient.price} {this.props.ingredient.currency}.
            </Text>
              <Text size="medium">
                Вес: {this.props.ingredient.weight} {this.props.ingredient.measureType}.
            </Text>
            </Box>
            <Box
              fit="content"
              alignContent="center"
              direction="column"
              justify="center"
              border={[{ side: 'left' }]}
              hoverIndicator
              onClick={this.handleClick}
            >
              <AddCircle size="medium" />
              <Text size="small" alignSelf="center">
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
