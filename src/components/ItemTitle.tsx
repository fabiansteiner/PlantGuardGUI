import {Component, Fragment} from "react";
import ItemService, {ItemSubscribe} from "./ItemService";
import {IconButton, withStyles} from "@material-ui/core";
import {changeName} from "./Util";
import {Field, Form, Formik, FormikActions} from "formik";
import {TextField} from "formik-material-ui";
import * as React from "react";
import {Delete} from "@material-ui/icons";
import ItemTemplate from "./ItemTemplate";
import {Plant} from "./ItemInterfaces";

interface I {
    item: Plant,
    title: string,
    classes
}

// We can inject some CSS into the DOM.
const styles = {
    root: {
        fontWeight: 700,
        fontFamily: "Montserrat",
        fontSize: "1.5em",
    },
    margin: {
        marginTop: 0,
    },
};

class ItemTitle extends Component<I> {
    _template: ItemTemplate;
    updateable = true;

    state = {
        item: null
    };

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item
        };
    }

    shouldComponentUpdate(nextProps, nextState): boolean {
        // If there are new props e.g a new name
        // then set it, but only if we are allowed to
        if (this.updateable) {
            this.state.item = nextProps.item;
        }

        // True renders
        return true
    }

    render() {
        return <Fragment>
            <ItemTemplate item={this.state.item}
                          ref={(c) => this._template = c}/>
            <Formik
                enableReinitialize
                validateOnChange={false}
                initialValues={this.state.item}
                onSubmit={(values, formikActions) => {
                    //console.log("Submit");
                    //changeName(values, ItemService.state.ws);
                    //this.updateable = true;
                    formikActions.setSubmitting(false);
                }}
                validate={values => {
                    const errors: Partial<any> = {};

                    console.log("Validate");

                    if(values.name.length < 1) {
                        errors.name = "Muss ausgefüllt werden"
                    }

                    if(Object.keys(errors).length == 0) {
                        changeName(values, ItemService.state.ws);
                        this.updateable = true;
                    }

                    return errors;
                }}
                render={({
                             values, errors, status, touched,
                             handleBlur, handleChange, handleSubmit,
                             isSubmitting, resetForm
                         }) => (
                    <Form id={"form"}>
                        {this.state.item &&
                        <h4 style={{marginBottom: 0}}>{this.props.title} - ID: {this.state.item.address}&nbsp;</h4>}
                        <div style={{position: "relative"}}>
                            <h1 style={{margin: 0}}/>
                            <Field
                                type="text"
                                name="name"
                                classes={{root: this.props.classes.margin}}
                                InputProps={{
                                    classes: {
                                        root: this.props.classes.root,
                                    }
                                }}
                                style={{font: "Montserrat", fontSize: "1.5em"}}
                                component={TextField}
                                fullWidth
                                margin={"normal"}/>
                            <div style={{position: "absolute", right: "0em", top: "0.5em"}}>
                                {this.props.children}

                                <IconButton onClick={() => this._template.deleteItem(true)}>
                                    <Delete/>
                                </IconButton>
                            </div>


                        </div>
                    </Form>
                )}/>
        </Fragment>
    }
}

export default withStyles(styles)(ItemTitle);
