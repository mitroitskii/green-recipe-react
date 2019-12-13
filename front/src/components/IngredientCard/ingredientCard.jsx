import React from 'react';
import { Grommet, Image } from "grommet";
import { grommet } from "grommet/themes";
import { Box } from 'grommet/components/Box';
import { Card } from 'grommet-controls/components/Card';
import { Value } from 'grommet-controls/components/Value';


export default class IngredientCard extends React.Component {
    state={

    }
    render() {
        return (
            <div>
                <Grommet theme={grommet}>
                    <Image
                        fallback="//v2.grommet.io/assets/IMG_4245.jpg"
                        src={this.state.href}
                    />

                </Grommet>
            </div>
        )
    }
}

