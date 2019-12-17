import React from "react";
import { Grommet, Box, Button, Text } from "grommet";
import { AddCircle } from "grommet-icons";

import "./ingredientCard.css"


export default class IngredientCard extends React.Component {
    // state = {
    //     name: "Яйца деревенские",
    //     href: "url" + "(" + "https://vkusvill.ru/upload/resize/94714/94714_530x300x85_c.jpg" + ")",
    //     price: "60 руб.",
    //     weight: "300 г.",
    // }
    handleClick() {
        const updatedIngredients = this.props.ingredients.concat([this.props.ingredient])
        this.props.setIngredients(updatedIngredients)
    }
    render() {
        return (
            <Box className={"wrapper"}>
                <Box direction="column" height="100%" width="100%">
                    <Box height="100%" width="100%" background={{ "image": `url(${this.props.ingredient.imageLink})`, "position": 'center' }}></Box>
                    <Box className={"bottom"} direction="row-responsive" height="35%" width="100%">
                        <Box className={"details"} height='100%' width="70%" direction="column" align="center" pad='10px'>
                            <Box>
                                <marquee behavior="alternate" scrollamount="2" direction="right"><Text size="xlarge" textAlign="start"> {this.props.ingredient.name}</Text></marquee>
                            </Box>
                            <Text size="large">Цена: {this.props.ingredient.price} {this.props.ingredient.currency}.</Text>
                            <Text size="large">Вес: {this.props.ingredient.weight} {this.props.ingredient.measureType}.</Text>
                        </Box>
                        <Box fit="content" align="center" justify="center"
                            border={[{ side: "left" }]}
                            hoverIndicator onClick={this.handleClick}>
                            <AddCircle size="large" />
                            <Text alignSelf="center" size="medium">Добавить в рецепт</Text>
                            </Box>
                        {/* <Button icon={<AddCircle size="large" />} fit="content" align="center" justify="center" label="Добавить в рецепт" onClick={this.handleClick} /> */}
                    </Box>
                </Box>
                {/* <div className={"inside"}>
                    <div className={"icon"}><i className={"material-icons"}>info</i></div>
                    <div className={"contents"}>
                        информация о товаре
                        </div>
                </div> */}
            </Box >
        )
    }
}

