import {Popover, Button, Input} from "antd";
import React from "react";
import 'antd/dist/antd.css';

class Search extends React.Component {
    onChange = (e) => {
        this.props.search(e.target.value.toUpperCase());
    };

    render() {
        const content = (
            <div>
                <Input autoFocus style={{textTransform: "uppercase"}} onChange={this.onChange} />
            </div>
        );
        return (
            <Popover content={content} title="Search" trigger="click">
                <Button shape="circle" icon="search"  htmlType="button"/>
            </Popover>
        );
    }
}

export default Search;