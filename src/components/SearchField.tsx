import * as React from 'react';
import {Component, Fragment} from 'react';
import {Input} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {Redirect} from 'react-router';
import {brightTheme} from "../App";
import {MuiThemeProvider} from "@material-ui/core/styles";

/**
 * A edittext which searches the items
 * If there is an input it will automatically to /search/ + the search name given to it
 */
export default class SearchField extends Component {
    state = {
        redirect: false,
        search: ""
    };

    handleValueChange(event) {
        this.setState({redirect: true, search: event.target.value});
    }

    render() {
        return <Fragment>
            {/*
             * Check the search field on every rerender
             * This will be triggered if the redirect and search values are changed by the searchfield
             */}
            {(() => {
                //console.log(window.location.pathname);

                // Is there a search?
                if (this.state.search.length <= 0) {
                    // No redirect to the dashboard
                    if (window.location.pathname !== "/dashboard")
                        return <Redirect push to={"/dashboard"}/>;
                } else if (this.state.redirect) {
                    // Yes redirect
                    if (window.location.pathname !== "/search/" + this.state.search)
                        return <Redirect push to={"/search/" + this.state.search}/>;
                }
            })()}

            <MuiThemeProvider theme={brightTheme}>
                <div className={"search"}>
                    <Search className={"icon"}/>
                    <Input className={"text"}
                           placeholder="Search…"
                           disableUnderline
                           onChange={this.handleValueChange.bind(this)}
                    />
                </div>
            </MuiThemeProvider>
        </Fragment>
    }
}