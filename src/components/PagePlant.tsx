import * as React from "react";
import {Component, Fragment} from "react";
import {Route} from 'react-router-dom'
import {Button,InputAdornment, MenuItem} from "@material-ui/core";
import {Switch, TextField} from 'formik-material-ui';
import {Identifiers, Items, PlantType} from "./ItemInterfaces";
import {Field, Form, Formik} from "formik";
import {changeSettings} from "./Util";
import ItemTitle from "./ItemTitle";
import PageTemplate from "./PageTemplate";
import ItemService from "./ItemService";
import ItemTemplate from "./ItemTemplate";


interface IPagePlant extends Items {
    match
}


/**
 * Component to add a plant and send it to the server
 * One can select a name, actor and sensor
 */
export default class PagePlant extends Component<IPagePlant> {
    _itemTemplate;

    constructor(props) {
        super(props);

    }

    render() {
        return <PageTemplate match={this.props.match}>
            {(pageTemplate) => (
                <Route render={({history}) => (
                    <Fragment>
                        <ItemTemplate item={pageTemplate.item} ref={(c) => this._itemTemplate = c}/>

                        <ItemTitle item={pageTemplate.item} title={"Pflanze"}/>

                        <Formik
                            validateOnChange
                            initialValues={pageTemplate.item}
                            onSubmit={(values, formikActions) => {
                                // Remove items which are not set by the form
                                if (pageTemplate.item.id !== null)
                                    delete(values.name);
                                changeSettings(values, ItemService.state.ws);
                                // Go back to dashboard
                                if (pageTemplate.item.id === null)
                                    history.push('/dashboard');
                                formikActions.setSubmitting(false);
                            }}
                            validate={values => {
                                const errors: Partial<any> = {};


                                // @ts-ignore
                                if (values.type === '') {
                                    errors.type = 'Muss ausgefüllt werden';
                                }

                                // @ts-ignore
                                if (values.waterAmount === '') {
                                    errors.waterAmount = 'Muss ausgefüllt werden';
                                } else if (values.waterAmount > 2000 || values.waterAmount < 0) {
                                    errors.waterAmount = 'Zu viel Wasser';
                                }

                                // @ts-ignore
                                if (!values.fertilizerPerLiter === '') {
                                    errors.fertilizerPerLiter = 'Muss ausgefüllt werden';
                                } else if (values.fertilizerPerLiter > 20 || values.fertilizerPerLiter < 0) {
                                    errors.fertilizerPerLiter = 'Zu viel Dünger';
                                }

                                // @ts-ignore
                                if (!values.threshold === '') {
                                    errors.threshold = 'Muss ausgefüllt werden';
                                } else if (values.threshold > 100 || values.threshold < 0) {
                                    errors.threshold = 'Maximal 100%';
                                }

                                // @ts-ignore
                                if (!values.waitTime === '') {
                                    errors.waitTime = 'Muss ausgefüllt werden';
                                } else if (values.waitTime > 3000 || values.waitTime < 0) {
                                    errors.waitTime = 'Zu lange Wartezeit';
                                }
                                return errors;
                            }}
                            render={({
                                         values,
                                         errors,
                                         status,
                                         touched,
                                         handleBlur,
                                         handleChange,
                                         handleSubmit,
                                         isSubmitting,
                                     }) => (

                                <Form id={"form"}>

                                    <Fragment>
                                        Automatische Bewässerung
                                        <Field component={Switch}
                                               color={"primary"}
                                               checked={values.autoWatering}
                                               id="autoWatering"
                                               name="autoWatering"
                                               onChange={handleChange}/>
                                    </Fragment>

                                    <Field
                                        name="type"
                                        select
                                        required
                                        label={"Pflanzenart"}
                                        component={TextField}
                                        fullWidth
                                        margin={"normal"}>
                                        <MenuItem key={1} value={PlantType.TOMATO}>
                                            Tomate
                                        </MenuItem>
                                        <MenuItem key={2} value={PlantType.CHILI}>
                                            Chili
                                        </MenuItem>
                                        <MenuItem key={3} value={PlantType.CUCUMBER}>
                                            Gurke
                                        </MenuItem>
                                        <MenuItem key={4} value={PlantType.MARIHUANA}>
                                            Marihuana
                                        </MenuItem>
                                        <MenuItem key={5} value={PlantType.PAPRIKA}>
                                            Paprika
                                        </MenuItem>
                                        <MenuItem key={6} value={PlantType.MICROGREENS}>
                                            Microgreens
                                        </MenuItem>
                                        <MenuItem key={7} value={PlantType.OTHER}>
                                            Andere
                                        </MenuItem>
                                    </Field>


                                        <Field
                                            required
                                            type="number"
                                            name="waterAmount"
                                            label={"Wassermenge [ml]"}
                                            component={TextField}
                                            fullWidth
                                            margin={"normal"}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="start">ml</InputAdornment>,
                                            }}/>
                                        <Field
                                            required
                                            type="number"
                                            name="fertilizerAmount"
                                            label={"Dünger pro Liter [ml]"}
                                            component={TextField}
                                            fullWidth
                                            margin={"normal"}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="start">ml</InputAdornment>,
                                            }}/>
                                        <Field
                                            required
                                            type="number"
                                            name="threshold"
                                            label={"Schwellwert für die Bewässerung [%]"}
                                            component={TextField}
                                            fullWidth
                                            margin={"normal"}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="start">%</InputAdornment>,
                                            }}/>
                                        <Field
                                            required
                                            type="number"
                                            name="waitTime"
                                            label={"Minimaler Zeitabstand zwischen Bewässerungen [Minuten]"}
                                            component={TextField}
                                            fullWidth
                                            margin={"normal"}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="start">Minuten</InputAdornment>,
                                            }}/>

    
                                    <Button variant={"contained"}
                                            style={{width: "100%", marginTop: "1em"}}
                                            color={"primary"}
                                            type={"submit"}>Pflanze speichern</Button>

                                    {pageTemplate.item.wateringStatus == Identifiers.STATUS_WATERING &&
                                    <Button variant={"contained"} disabled className="water-button"
                                            style={{width: "100%", marginTop: "1em"}}
                                            color={"primary"}>Wird bewässert</Button>}

                                    {/*In der queue aber nicht das erste*/}
                                    {pageTemplate.item.wateringStatus == Identifiers.STATUS_IN_QUEUE &&
                                    <Button variant={"contained"} disabled className="water-button"
                                            style={{width: "100%", marginTop: "1em"}}
                                            color={"primary"}>In der Warteschlange</Button>}

                                    {pageTemplate.item.wateringStatus == Identifiers.STATUS_NOTHINSCHEDULED &&
                                    <Button variant={"contained"} className="water-button" color={"primary"}
                                            style={{width: "100%", marginTop: "1em"}}
                                            onClick={() => this._itemTemplate.showWaterPopup()}>Bewässern</Button>}
                                </Form>
                            )}/>
                    </Fragment>
                )}/>
            )}
        </PageTemplate>
    }
}
