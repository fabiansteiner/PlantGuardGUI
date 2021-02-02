import * as React from "react";
import {Component} from "react";
import {Grid} from "@material-ui/core";
import {Plant} from "./ItemInterfaces";
import ItemTemplate from "./ItemTemplate";


import WhiteEdgedContainer from "./WhiteEdgedContainer";

/**
 * Makes a oneliner item which shows some information about the item
 */
class ItemSmall extends Component<Plant> {
    render() {
        return <WhiteEdgedContainer>
            {(() => {
                
                    return <SmallUnknownItem {...this.props}/>;
                
            })()}
        </WhiteEdgedContainer>
    }
}


class SmallUnknownItem extends Component<Plant> {
    _template: ItemTemplate;

    render() {
        return <ItemTemplate item={this.props} ref={(c) => this._template = c}>
            <div className={"small-item-content"} onClick={() => this._template.showInfo()}>
                <i className="fas fa-question fa-lg fa-fw" style={{marginRight: "0.5em"}}/>
                <Grid container>
                    <Grid item>
                        <div className={"name"}>{this.props.name}</div>
                    </Grid>
                    <Grid item className={"values"}>

                    </Grid>
                </Grid>
            </div>
        </ItemTemplate>
    }
}


export default (ItemSmall);
