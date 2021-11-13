import * as React from "react";
import {Component, Fragment} from "react";
import {Route} from 'react-router-dom'
import {Button,InputAdornment, MenuItem} from "@material-ui/core";
import {Switch, TextField} from 'formik-material-ui';
import {Identifiers, Items, PlantType, languageEN as language} from "./ItemInterfaces";
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

                        <ItemTitle item={pageTemplate.item} title={language.plantPageTitle}/>

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
                                    errors.type = language.valuesIsMissing;
                                }

                                // @ts-ignore
                                if (values.waterAmount === '') {
                                    errors.waterAmount = language.valuesIsMissing;
                                } else if (values.waterAmount > 5000 || values.waterAmount < 0) {
                                    errors.waterAmount = language.keepWaterLimit;
                                }

                                // @ts-ignore
                                if (!values.fertilizerAmount === '') {
                                    errors.fertilizerAmount = language.valuesIsMissing;
                                } else if (values.fertilizerAmount > 20 || values.fertilizerPerLiter < 0) {
                                    errors.fertilizerAmount = language.keepFertilizerLimit;
                                }

                                // @ts-ignore
                                if (!values.threshold === '') {
                                    errors.threshold = language.valuesIsMissing;
                                } else if (values.threshold > 50 || values.threshold < 0) {
                                    errors.threshold = language.keepThresholdLimit;
                                }

                                // @ts-ignore
                                if (!values.waitTime === '') {
                                    errors.waitTime = language.valuesIsMissing;
                                } else if (values.waitTime > 3000 || values.waitTime < 0) {
                                    errors.waitTime = language.keepWaitingTimeLimit;
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
                                        {language.autoWatering}
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
                                        label={language.plantType}
                                        component={TextField}
                                        fullWidth
                                        margin={"normal"}>
                                        <MenuItem key={1} value={PlantType.TOMATO}>
                                            {language.plantTypeTomato}
                                        </MenuItem>
                                        <MenuItem key={2} value={PlantType.CHILI}>
                                            {language.plantTypeChilli}
                                        </MenuItem>
                                        <MenuItem key={3} value={PlantType.CUCUMBER}>
                                            {language.plantTypeCucumber}
                                        </MenuItem>
                                        <MenuItem key={4} value={PlantType.MARIHUANA}>
                                            {language.plantTypeMarihuana}
                                        </MenuItem>
                                        <MenuItem key={5} value={PlantType.PAPRIKA}>
                                            {language.plantTypePaprika}
                                        </MenuItem>
                                        <MenuItem key={6} value={PlantType.MICROGREENS}>
                                            {language.plantTypeMicrogreens}
                                        </MenuItem>
                                        <MenuItem key={7} value={PlantType.OTHER}>
                                            {language.plantTypeOther}
                                        </MenuItem>
                                    </Field>


                                        <Field
                                            required
                                            type="number"
                                            name="waterAmount"
                                            label={language.amountOfWater}
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
                                            label={language.amountOfFertilizer}
                                            component={TextField}
                                            fullWidth
                                            margin={"normal"}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="start">ml/l</InputAdornment>,
                                            }}/>
                                        <Field
                                            required
                                            type="number"
                                            name="threshold"
                                            label={language.thresholdForWatering}
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
                                            label={language.minimalPause}
                                            component={TextField}
                                            fullWidth
                                            margin={"normal"}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="start">{language.minutes}</InputAdornment>,
                                            }}/>

    
                                    <Button variant={"contained"}
                                            style={{width: "100%", marginTop: "1em"}}
                                            color={"primary"}
                                            type={"submit"}>{language.safePlant}</Button>

                                    {pageTemplate.item.wateringStatus == Identifiers.STATUS_WATERING &&
                                    <Button variant={"contained"} disabled className="water-button"
                                            style={{width: "100%", marginTop: "1em"}}
                                            color={"primary"}>{language.irrigationButtonWatering}</Button>}

                                    {/*In der queue aber nicht das erste*/}
                                    {pageTemplate.item.wateringStatus == Identifiers.STATUS_IN_QUEUE &&
                                    <Button variant={"contained"} disabled className="water-button"
                                            style={{width: "100%", marginTop: "1em"}}
                                            color={"primary"}>{language.irrigationButtonQueue}</Button>}

                                    {pageTemplate.item.wateringStatus == Identifiers.STATUS_NOTHINSCHEDULED &&
                                    <Button variant={"contained"} className="water-button" color={"primary"}
                                            style={{width: "100%", marginTop: "1em"}}
                                            onClick={() => this._itemTemplate.showWaterPopup()}>{language.irrigationButton}</Button>}
                                </Form>
                            )}/>
                    </Fragment>
                )}/>
            )}
        </PageTemplate>
    }
}
