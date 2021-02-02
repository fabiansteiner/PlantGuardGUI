import * as React from "react";
import {Component, Fragment} from "react";
import {Identifiers, Plant} from "./ItemInterfaces";
import EditNamePopup from "./EditNamePopup";
import {Redirect} from 'react-router-dom'
import ItemService from "./ItemService";
import {deleteItem, send, waterPlant} from "./Util";
import AreYouSure from "./AreYouSure";

interface IItem {
    item: Plant
}

export default class ItemTemplate extends Component<IItem> {
    state = {
        info: false,
        editNamePopup: false,
        deletePopup: false,
        waterPopup: false,
        toDashboard: false,
    };

    toDashboardAfterDelete = false;

    showInfo() {
        this.setState({info: true});
    }

    showWaterPopup() {

        this.setState({waterPopup: true});
        console.log(this.props.item);
        
    }


    send() {
        send(this.props.item, ItemService.state.ws);
    }

    showEditNamePopup() {
        this.setState({editNamePopup: true});
    }

    deleteItem(...toDashboardAfterDelete) {
        this.setState({deletePopup: true});
        this.toDashboardAfterDelete = toDashboardAfterDelete[0];
    }

    private _deleteItem() {
        deleteItem(this.props.item, ItemService.state.ws);
        this.setState({toDashboard: this.toDashboardAfterDelete});
    }

    render() {
        return <Fragment>

            {this.state.toDashboard && <Redirect to={'/dashboard'}/>}

            {(() => {
                if (this.state.info) {
                   
                    return <Redirect to={'/plant/' + this.props.item.address}/>;
                        
                }
            })()}
            <EditNamePopup item={this.props.item} isOpen={this.state.editNamePopup}
                           onClose={() => this.setState({editNamePopup: false})}/>

            <AreYouSure title={"Jetzt bewässern?"} accept={"Bewässern"} back={"Zurück"} item={this.props.item}
                        isOpen={this.state.waterPopup} onClose={() => this.setState({waterPopup: false})}
                        onAccept={() => waterPlant(this.props.item as Plant, ItemService.state.ws)}/>

            <AreYouSure title={"Willst du das wirklich löschen?"} accept={"Ja"} back={"Nein"}
                        item={this.props.item} isOpen={this.state.deletePopup}
                        onClose={() => this.setState({deletePopup: false})}
                        onAccept={() => this._deleteItem()}/>

            {this.props.children}
        </Fragment>
    }
}

/*

interface ISmallActorItem {
    item: Actor
}

export default class SmallActorItem extends Component<ISmallActorItem> {
    _template: ItemTemplate;

    render() {
        return <ItemTemplate item={this.props.item} ref={(c) => this._template = c}>

        </ItemTemplate>
    }
}
 */