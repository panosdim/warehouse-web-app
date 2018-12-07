import React from 'react';
import {Modal, Form, Input, DatePicker, InputNumber} from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";
import {auth, db} from "./Firebase";
import Item from "./Item";

const FormItem = Form.Item;

const ItemDetailsForm = Form.create()(
    class extends React.Component {
        render() {
            const {
                onCancel, onOk, form, item
            } = this.props;
            const {getFieldDecorator} = form;
            if (!item) {
                return null;
            }
            let dateValue = {initialValue: null};
            if (item.exp_date) {
                dateValue.initialValue = moment(item.exp_date);
            }
            return (
                <Modal
                    title="Item Details"
                    visible={true}
                    onOk={onOk}
                    onCancel={onCancel}
                    okText="Save"
                    cancelText="Delete"
                    destroyOnClose={true}
                    okButtonProps={{type: "primary"}}
                    cancelButtonProps={{type: "danger"}}>
                    <Form
                        layout="vertical">
                        <FormItem label="Name">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please input the name of the item!'}],
                                initialValue: item.name
                            })(
                                <Input style={{textTransform: "uppercase"}}/>
                            )}
                        </FormItem>
                        <FormItem label="Expiration Date">
                            {getFieldDecorator('exp_date', dateValue)(<DatePicker format="YYYY-MM-DD"/>)}
                        </FormItem>
                        <FormItem label="Amount">
                            {getFieldDecorator('amount', {
                                rules: [{required: true, message: 'Please input the amount of the item!'}],
                                initialValue: item.amount
                            })(
                                <InputNumber min={1} max={10}/>
                            )}
                        </FormItem>
                        <FormItem label="Box">
                            {getFieldDecorator('box', {
                                rules: [{required: true, message: 'Please input the box where items is stored!'}],
                                initialValue: item.box
                            })(
                                <InputNumber min={1} max={10}/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
);

class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.currentUser = auth.currentUser;
    }

    componentWillReceiveProps(props) {
        this.setState({item: props.item});
    }

    handleOk = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            const exp_date = values.exp_date ? values.exp_date.format("YYYY-MM-DD") : "";
            const updatedItem = new Item(values.name.toUpperCase(), exp_date, values.amount.toString(), values.box.toString());
            if (!updatedItem.isEqual(this.state.item)) {
                const itemRef = db.ref('/items/' + this.currentUser.uid).child(this.state.item.key);
                // Write the new Item data in the database.
                // noinspection JSIgnoredPromiseFromCall
                itemRef.set(updatedItem);
            }
            this.props.handleClose();
            form.resetFields();
        });
    };

    handleCancel = (e) => {
        e.preventDefault();
        if (e.target.type === "button") {
            const itemRef = db.ref('/items/' + this.currentUser.uid).child(this.state.item.key);
            // Write the new Item data in the database.
            // noinspection JSIgnoredPromiseFromCall
            itemRef.remove();
        }
        this.props.handleClose();
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <div>
                <ItemDetailsForm
                    wrappedComponentRef={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    item={this.state.item}
                />
            </div>
        );
    }
}

export default ItemDetails;