import * as React from "react";
import {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {ErrorState, Items, Plant} from "./ItemInterfaces";
import ItemPlant from "./ItemPlant";
import NoItems from "./NoItems";


export interface DashboardI {
    items: Array<any>
    error: ErrorState
}

/**
 * A dashboard containing all items
 * The items a structured in
 *  NotBonded -> An e.g. actor is not connected to a plant
 *  Favorite
 *  Ignored
 *  NotImplemented
 */
export default class Dashboard extends Component<DashboardI> {
    
    
    render() {
        let items = this.props.items;
        let error = this.props.error;

        {/* Display info message if there are no items */
        }
        if (items.length !== 0) {
            
            return <React.Fragment>
                {error.waterPressureHigh && <div className={"error"}>WASSERDRUCK ZU HOCH - Bewässerungsvorgang abgebrochen.</div>}
                {error.notEnoughWaterFlow && <div className={"error"}>WASSERFLUSS ZU NIEDRIG - Bewässerungsvorgang abgebrochen.</div>}
                {error.oneOrMoreValvesOffline && <div className={"error"}>Verbindung zu Quetschventil/en ist unterbrochen.</div>}
                {error.oneOrMoreValveErrors && <div className={"error"}>Beim auf- oder zumachen eine bzw. mehrere Ventile ist ein Fehler aufgetreten.</div>}
                {error.oneOrMoreValvesNotClosed && <div className={"valvewarning"}>Bewässerung deaktiviert. Eins oder mehrere Ventile wurden manuell geöffnet.</div>}
                <div className={"dashboard"}>

                    <Grid container direction={"row"} style={{justifyContent: "center"}} spacing={2}>
                        <Plants items={items}/>
                    </Grid>
                </div>
            </React.Fragment>
        } else {
            return <NoItems/>
        }
    }
}





function Plants(props: { items: Plant[] }) {
    let plants = props.items;

    if (plants.length <= 0) return null;

    return <Grid item xs={11} md={10}>
        <Grid container>
            {/* Iterate over the items and check if they are corresponding */}
            {plants.map((item, index) => {
                return <Grid item xs={12} sm={6} md={4} key={item.address}>
                    <ItemPlant {...item as Plant}/>
                </Grid>
            })}

        </Grid>
    </Grid>
}

