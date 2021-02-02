import * as React from "react";
import {Component} from "react";

export default class WhiteContainer extends Component {
    render() {
        return <div className={"white-container"}>
            {this.props.children}
        </div>
    }
}