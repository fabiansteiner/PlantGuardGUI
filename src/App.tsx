import * as React from 'react';
import {Component, Fragment} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

import "./stylesheets/main.css"

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageDashboard from "./components/PageDashboard";
import PagePlant from "./components/PagePlant";
import PageSearch from "./components/PageSearch";
import {ItemSubscribe} from "./components/ItemService";
import {Provider} from "unstated";
import {
    AppBar,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Add, ArrowBack, ExpandLess, ExpandMore, Favorite, Home, Menu} from "@material-ui/icons";
import SearchField from "./components/SearchField";
import {AddPlantLink, AddRuleLink, DashboardLink} from "./components/Links";
import {Plant} from "./components/ItemInterfaces";
import ItemTemplate from "./components/ItemTemplate";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

// For Material UI Elements
export const darkTheme = createMuiTheme({
    "palette": {
        "common": {
            "black": "rgba(0, 0, 0, 1)",
            "white": "rgba(255, 255, 255, 1)"
        },
        "background": {
            "paper": "rgba(40, 40, 40, 1)",
            "default": "rgba(255, 255, 255, 1)"
        },
        "primary": {
            "light": "rgba(255, 255, 255, 1)",
            "main": "rgba(255, 255, 255, 1)",
            "dark": "rgba(255, 255, 255, 1)",
            "contrastText": "rgba(0, 0, 0, 1)"
        },
        "secondary": {
            "light": "rgba(91, 91, 91, 1)",
            "main": "rgba(38, 38, 38, 1)",
            "dark": "rgba(18, 18, 18, 1)",
            "contrastText": "rgba(255, 255, 255, 1)"
        },
        "text": {
            "primary": "rgba(255, 255, 255, 0.87)",
            "secondary": "rgba(255, 255, 255, 0.54)",
            "disabled": "rgba(189, 189, 189, 0.38)",
            "hint": "rgba(223, 223, 223, 0.38)"
        }
    },
    overrides: {
        MuiButton: { // Name of the component ⚛️ / style sheet
            contained: { // Name of the rule
                borderRadius: 0, // Some CSS
                boxShadow: "none"
            },
        },
    },
});

export const brightTheme = createMuiTheme({
    "palette": {
        "primary": {
            "light": "rgb(70, 161, 33)",
            "main": "rgb(70, 161, 33)",
            "dark": "rgb(70, 161, 33)",
            "contrastText": "rgba(255, 255, 255, 1)"
        },
        "secondary": {
            "light": "rgba(91, 91, 91, 1)",
            "main": "rgba(38, 38, 38, 1)",
            "dark": "rgba(18, 18, 18, 1)",
            "contrastText": "rgba(255, 255, 255, 1)"
        }
    },
    overrides: {
        MuiButton: { // Name of the component ⚛️ / style sheet
            contained: { // Name of the rule
                borderRadius: 0, // Some CSS
                boxShadow: "none",
                //backgroundImage: "linear-gradient(181deg, #58d200, #378101)"
            },
        },
    },
});

/**
 * If first created it will open a websocket and send a request to get all items back
 * The items are sorted and transmitted to the dashboard to render
 */
export default class App extends Component {
    state = {
        drawer: false,
        actors: false,
        plants: false,
        rules: false,
        waterSensors: false,
        tempSensors: false
    };

    toggleDrawer(open) {
        this.setState({
            drawer: open,
        });
    };

    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>

                <Provider>
                    <CssBaseline/>
                    <ItemSubscribe>
                        {(subscriber) => (
                            <BrowserRouter>
                                <Fragment>
                                    <div className="app">
                                        <MuiThemeProvider theme={darkTheme}>
                                            <AppBar position="static" color="secondary">
                                                <Toolbar>
                                                    <Route path="/(plant|search|watersensor|thsensor|rule|actor)/"
                                                           render={() =>
                                                               <IconButton aria-label="Menu" color="inherit"
                                                                           component={DashboardLink}>
                                                                   <ArrowBack/>
                                                               </IconButton>}/>
                                                    <Typography variant="h6" style={{flexGrow: 1}} color="inherit">
                                                        Plant Guard
                                                    </Typography>
                                                    {/* If the route is dashboard or search display the searchfield */}
                                                    <Route path="/(dashboard|search)/" render={() => <SearchField/>}/>
                                                </Toolbar>
                                            </AppBar>
                                        </MuiThemeProvider>

                                        <MuiThemeProvider theme={brightTheme}>
                                            <Redirect exact from="/" to="/dashboard" />
                                            <Route path="/plant/:id?"
                                                   render={(props) => <PagePlant {...props}/>}/>
                                            <Route path="/dashboard"
                                                   render={() => <PageDashboard error={subscriber.state.error} items={subscriber.state.items}/>}/>
                                            {/* Display the PageSearch Component it there is something to search for*/}
                                            <Route path="/search/:searchtext"
                                                   component={(props) => <PageSearch
                                                       items={subscriber.state.items} {...props}/>}/>
                                            {/*<Route path="/plants" render={() => <PlantSite items={this.state.items}/>}/>*/}
                                        </MuiThemeProvider>
                                    </div>

                                </Fragment>
                            </BrowserRouter>
                        )}
                    </ItemSubscribe>
                </Provider>
            </MuiPickersUtilsProvider>
        );
    }

        
    
}
