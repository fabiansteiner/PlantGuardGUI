import * as React from "react";
import {Component} from "react";
import {Button, IconButton} from "@material-ui/core";
import {MoreHoriz} from "@material-ui/icons";
import {Identifiers, Plant, PlantType} from "./ItemInterfaces";
import ItemTemplate from "./ItemTemplate";
import Flowerpot from "./Flowerpot";
//@ts-ignore
import DropSVG from "../assets/drops.svg";
//@ts-ignore
import GenericPlant from "../assets/plant.svg";
//@ts-ignore
import TomatoPlant from "../assets/tomato.svg";
//@ts-ignore
import PaparicaPlant from "../assets/paprica.svg";
//@ts-ignore
import ChilliPlant from "../assets/chilli.svg";
//@ts-ignore
import CucumberPlant from "../assets/cucumber.svg";
//@ts-ignore
import MicroGreensPlant from "../assets/microgreens.svg";
//@ts-ignore
import MarihuanaPlant from "../assets/marihuana.svg";
import {ItemSubscribe} from "./ItemService";

/**
 * Returns a bigger item than small item
 * Displays more information
 */
export default class ItemPlant extends Component<Plant> {
    _template;

    render() {
        return <ItemSubscribe>
            {(subscriber) => (
                <div className="big-item" >
                    <div className="border" onClick={() => this._template.showInfo()}>
                        <div className="top">
                            <h3 className="title">{this.props.name}</h3>
                        </div>

                        <IconButton onClick={() => this._template.showInfo()} className="more-button">
                            <MoreHoriz/>
                        </IconButton>

                        <div className="big-item-content">
                            {(() => {
                                switch (this.props.type) {
                                    case PlantType.TOMATO:
                                        return <div className="plant-container"><img src={TomatoPlant}
                                                                                     className="plant"/></div>;
                                    case PlantType.PAPRIKA:
                                        return <div className="plant-container"><img src={PaparicaPlant}
                                                                                     className="plant"/></div>;
                                    case PlantType.CHILI:
                                        return <div className="plant-container"><img src={ChilliPlant}
                                                                                     className="plant"/></div>;
                                    case PlantType.CUCUMBER:
                                        return <div className="plant-container"><img src={CucumberPlant}
                                                                                     className="plant"/></div>;
                                    case PlantType.MICROGREENS:
                                        return <div className="microgreens-container"><img src={MicroGreensPlant}
                                                                                     className="plant"/></div>;
                                    case PlantType.MARIHUANA:
                                        return <div className="plant-container"><img src={MarihuanaPlant}
                                                                                           className="plant"/></div>;
                                    default:
                                        return <div className="plant-container"><img src={GenericPlant}
                                                                                     className="plant"/></div>;
                                }
                            })()}
                            <div className="line-break"></div>
                            <Flowerpot level={this.props.soilMoisture}/>
                        </div>
                    </div>

                    {this.props.wateringStatus == Identifiers.STATUS_WATERING && <img src={DropSVG} className="drops"/>}

                    <div className="bottom">
                        {!this.props.autoWatering && <div className="warning">Automatische Bewässerung deaktiviert</div>}

                        {this.props.wateringStatus == Identifiers.STATUS_WATERING &&
                        <Button variant={"contained"} disabled className="water-button"
                                color={"primary"}>Wird bewässert</Button>}

                        {/*In der queue aber nicht das erste*/}
                        {this.props.wateringStatus == Identifiers.STATUS_IN_QUEUE &&
                        <Button variant={"contained"} disabled className="water-button"
                                color={"primary"}>In der Warteschlange</Button>}

                        {/*Nicht in der queue als kann man es bewässern*/}
                        {this.props.wateringStatus == Identifiers.STATUS_NOTHINSCHEDULED &&
                        <Button variant={"contained"} className="water-button" color={"primary"}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    this._template.showWaterPopup();
                                }}>Bewässern</Button>}
                    </div>

                    <ItemTemplate item={this.props} ref={(c) => this._template = c}/>
                </div>
            )}
        </ItemSubscribe>
    }
}