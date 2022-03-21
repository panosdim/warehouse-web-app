import { OrderedListOutlined } from '@ant-design/icons';
import {Popover, Button, Radio} from "antd";
import React from "react";
import 'antd/dist/antd.css';
import {
    sortByBoxAsc,
    sortByBoxDesc,
    sortByDateAsc,
    sortByDateDesc,
    sortByNameAsc,
    sortByNameDesc
} from "./SortFunctions";

const RadioGroup = Radio.Group;

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            property: 2,
            order: 1
        };
    }

    onChangeItem = (e) => {
        this.setState({
            property: e.target.value,
        });
        if (e.target.value === 1) {
            if (this.state.order === 1) {
                this.props.sortBy(sortByNameAsc);
            } else {
                this.props.sortBy(sortByNameDesc);
            }
        } else if (e.target.value === 2) {
            if (this.state.order === 1) {
                this.props.sortBy(sortByDateAsc);
            } else {
                this.props.sortBy(sortByDateDesc);
            }
        } else if (e.target.value === 3) {
            if (this.state.order === 1) {
                this.props.sortBy(sortByBoxAsc);
            } else {
                this.props.sortBy(sortByBoxDesc);
            }
        }
    };

    onChangeOrder = (e) => {
        this.setState({
            order: e.target.value,
        });
        if (this.state.property === 1) {
            if (e.target.value === 1) {
                this.props.sortBy(sortByNameAsc);
            } else {
                this.props.sortBy(sortByNameDesc);
            }
        } else if (this.state.property === 2) {
            if (e.target.value === 1) {
                this.props.sortBy(sortByDateAsc);
            } else {
                this.props.sortBy(sortByDateDesc);
            }
        } else if (this.state.property === 3) {
            if (e.target.value === 1) {
                this.props.sortBy(sortByBoxAsc);
            } else {
                this.props.sortBy(sortByBoxDesc);
            }
        }
    };

    render() {
        const content = (
            <div>
                <RadioGroup onChange={this.onChangeItem} value={this.state.property}>
                    <Radio value={1}>Name</Radio>
                    <Radio value={2}>Expiration Date</Radio>
                    <Radio value={3}>Box</Radio>
                </RadioGroup>
                <br/>
                <RadioGroup onChange={this.onChangeOrder} value={this.state.order}>
                    <Radio value={1}>Ascending</Radio>
                    <Radio value={2}>Descending</Radio>
                </RadioGroup>
            </div>
        );
        return (
            <Popover content={content} title="Sort Items" trigger="click">
                <Button shape="circle" icon={<OrderedListOutlined />} htmlType="button"/>
            </Popover>
        );
    }
}

export default Sort;