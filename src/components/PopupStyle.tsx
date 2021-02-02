import * as React from "react";
import {Component} from "react";
import {ClickAwayListener, Grid} from "@material-ui/core";
import WhiteContainer from "./WhiteContainer";

interface IPopup {
    onClose: () => void;
}

export default class PopupStyle extends Component<IPopup> {
    render() {
        return <div className={"popup"}>
            <div className={"grey-background"}>
                <Grid container style={{justifyContent: "center", alignItems: "center", height: "100%"}}>
                    <Grid item>
                        <ClickAwayListener onClickAway={this.props.onClose}>
                            <WhiteContainer>
                                {this.props.children}
                            </WhiteContainer>
                        </ClickAwayListener>
                    </Grid>
                </Grid>
            </div>
        </div>
    }
}