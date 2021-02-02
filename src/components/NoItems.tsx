import {IconButton} from "@material-ui/core";
import {Refresh} from "@material-ui/icons";
import * as React from "react";
import {Component} from "react";
import {darkTheme} from "../App";
import {MuiThemeProvider} from "@material-ui/core/styles";

export default class NoItems extends Component {
    render() {
        return <div className={"center white"} style={{textAlign: "center"}}>
            <h2>You have no active components on your network</h2>
            <h4>Connect them to your network and refresh this page if they are not appearing</h4>
            <div>
                <MuiThemeProvider theme={darkTheme}>
                    <IconButton onClick={() => window.document.location.reload()} color="primary">
                        <Refresh/>
                    </IconButton>
                </MuiThemeProvider>
            </div>
        </div>
    }
}