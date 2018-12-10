import React from 'react';
import {Modal, Form, Input, DatePicker, InputNumber, message} from 'antd';
import 'antd/dist/antd.css';
import {auth, db} from "./Firebase";
import Item from "./Item";

const FormItem = Form.Item;

const ItemAddForm = Form.create()(
    class extends React.Component {
        render() {
            const {
                onCancel, onOk, form
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    title="Add New Item"
                    visible={true}
                    onOk={onOk}
                    onCancel={onCancel}
                    okText="Save"
                    cancelText="Cancel"
                    destroyOnClose={true}
                    okButtonProps={{type: "primary"}}>
                    <Form
                        layout="vertical">
                        <FormItem label="Name">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please input the name of the item!'}],
                            })(
                                <Input style={{textTransform: "uppercase"}}/>
                            )}
                        </FormItem>
                        <FormItem label="Expiration Date">
                            {getFieldDecorator('exp_date')(<DatePicker format="YYYY-MM-DD"/>)}
                        </FormItem>
                        <FormItem label="Amount">
                            {getFieldDecorator('amount', {
                                rules: [{required: true, message: 'Please input the amount of the item!'}],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={10}/>
                            )}
                        </FormItem>
                        <FormItem label="Box">
                            {getFieldDecorator('box', {
                                rules: [{required: true, message: 'Please input the box where items is stored!'}],
                                initialValue: 1
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

class ItemAdd extends React.Component {
    constructor(props) {
        super(props);
        this.currentUser = auth.currentUser;
    }

    handleOk = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            const exp_date = values.exp_date ? values.exp_date.format("YYYY-MM-DD") : "";
            const newItem = new Item(values.name.toUpperCase(), exp_date, values.amount.toString(), values.box.toString());
            // Get a key for a new Item.
            const newItemRef = db.ref('/items/' + this.currentUser.uid).push();

            // Write the new Item data in the database.
            // noinspection JSIgnoredPromiseFromCall
            newItemRef.set(newItem);

            message.success('Item added successfully');

            this.props.handleClose();
            form.resetFields();
        });
    };

    handleCancel = (e) => {
        e.preventDefault();
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
                <ItemAddForm
                    wrappedComponentRef={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                />
            </div>
        );
    }
}

export default ItemAdd;