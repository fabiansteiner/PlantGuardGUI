import * as React from "react";
import {Component} from "react";
import PopupStyle from "./PopupStyle";
import {Button} from "@material-ui/core";
import {deleteItem} from "./Util";
import ItemService, {ItemSubscribe} from "./ItemService";
import {Plant} from "./ItemInterfaces";
import {Form, Formik} from "formik";

interface I {
    title: string
    accept: string
    back: string
    item: Plant
    isOpen: boolean
    onClose: () => void
    onAccept: () => void
}

/**
 * Opens an popup to edit the item
 * @param props
 * @constructor
 */
export default class AreYouSure extends Component<I> {

    render() {
        if (this.props.isOpen)
            return (<PopupStyle onClose={() => this.props.onClose()}>
                    <h3 style={{margin: 0, marginBottom: "0.5em"}}>{this.props.title}</h3>
                    <Formik
                        validateOnChange
                        initialValues={{...this.props.item}}
                        onSubmit={values => {
                            this.props.onAccept();
                            this.props.onClose();
                        }}
                        render={({}) => (
                            <Form id={"form"}>
                                <Button style={{color: "red"}} variant={"text"}
                                        onClick={() => this.props.onClose()}>{this.props.back}</Button>
                                <Button variant={"text"} color={"primary"} style={{float: "right"}}
                                        type={"submit"}>{this.props.accept}</Button>

                            </Form>
                        )}/>
                </PopupStyle>
            );
        else return (null)
    }
}
