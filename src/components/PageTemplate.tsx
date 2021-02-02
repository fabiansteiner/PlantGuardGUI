import * as React from "react";
import {Component} from "react";
import {Grid} from "@material-ui/core";

import ItemService, {ItemSubscribe} from "./ItemService";


interface I {
    children
    match
}


/**
 * Component to add a sensor and send it to the server
 * One can select a name, actor and sensor
 */
export default class PageTemplate extends Component<I> {

    state = {
        item: ItemService.getPlant_id(+this.props.match.params.id),
    };

    constructor(props) {
        super(props);
        window.scrollTo(0, 0,);
    }



    render() {
        return <Grid container className="detail-page">
            <Grid item xs={11} sm={6}>
               
                    {this.props.children(this.state)}

            </Grid>

        </Grid>
    }

}
