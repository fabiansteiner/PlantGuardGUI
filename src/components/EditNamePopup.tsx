import * as React from "react";
import {Component} from "react";
import PopupStyle from "./PopupStyle";
import {Button, TextField} from "@material-ui/core";
import {changeName} from "./Util";
import ItemService, {ItemSubscribe} from "./ItemService";
import {Plant} from "./ItemInterfaces";
import {Field, Form, Formik} from "formik";

interface IInfoPopup {
    item: Plant
    isOpen: boolean
    onClose: () => void
}

/**
 * Opens an popup to edit the item
 * @param props
 * @constructor
 */
class EditNamePopup extends Component<IInfoPopup> {

    validateName(value) {
        let error;
        if (value.length < 4 || value.length > 15) {
            error = true;
        }
        return error;
    }

    render() {
        if (this.props.isOpen)
            return (<PopupStyle onClose={() => this.props.onClose()}>
                    <h3 style={{margin: 0}}>Namensänderung</h3>
                    <Formik
                        validateOnChange
                        initialValues={{...this.props.item}}
                        onSubmit={values => {
                            changeName(values, ItemService.state.ws);
                            this.props.onClose();
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
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    label={"Name"}
                                    value={values.name}
                                    onChange={handleChange}
                                    validate={this.validateName}
                                    error={errors.name}
                                    component={TextField}
                                    autoFocus
                                    fullWidth
                                    required
                                    margin={"normal"}/>
                                <Button style={{color: "red"}} variant={"text"}
                                        onClick={() => this.props.onClose()}>Zurück</Button>
                                <Button variant={"text"} color={"primary"} style={{float: "right"}}
                                        type={"submit"}>Speichern</Button>

                            </Form>
                        )}/>
                </PopupStyle>
            );
        else return (null)
    }
}

export default EditNamePopup;
