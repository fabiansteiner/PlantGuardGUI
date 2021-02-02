import * as React from "react";
import {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {Items} from "./ItemInterfaces";
import ItemSmall from "./ItemSmall";
import NoItems from "./NoItems";

interface IDashboard extends Items {
    match
}

/**
 * Like the dashboard but only display elements which correspond to a search value
 * Returns a list of small items
 */
export default class PageSearch extends Component<IDashboard> {
    render() {
        let items = this.props.items;

        let searchItems = [];

        items.forEach((item) => {
            let match = false;

            if (item.address !== undefined && item.address !== null) {
                if (String(item.address).search(this.props.match.params.searchtext.toLowerCase()) >= 0) {
                    match = true;
                }
            }

            if (item.name !== undefined && item.name !== null) {
                if (item.name.toLowerCase().search(this.props.match.params.searchtext.toLowerCase()) >= 0) {
                    match = true;
                }
            }


            if (match)
                searchItems.push(item)
        });

        /* If there are no items display info message */
        if (items.length !== 0) {
            return <div className={"dashboard"}>
                <Grid container direction={"row"} style={{justifyContent: "center"}} spacing={8}>
                    <Grid item xs={11} md={10}>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className={"item-heading"}>
                                    <h3>Suche nach: {this.props.match.params.searchtext}</h3>
                                </div>
                            </Grid>

                            {searchItems.map((item, index) => {
                                return <Grid item xs={12} md={12} key={item.clazz + item.id}>
                                        <ItemSmall {...item}/>
                                    </Grid>
                            })}

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        } else {
            return <NoItems/>
        }
    }
}

