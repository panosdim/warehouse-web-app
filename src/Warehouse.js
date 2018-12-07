import React from 'react';
import { auth } from "./Firebase";
import {Layout, Button, Row, Col, BackTop } from 'antd';
import 'antd/dist/antd.css';
import ItemCards from "./ItemCards"
import ItemAdd from "./ItemAdd";
import StockSvg from './stock.svg';
import Sort from "./Sort";
import {sortByDateAsc} from "./SortFunctions";

const {Header, Content} = Layout;

class Warehouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            sortBy: sortByDateAsc
        };
    }

    signOut = () => {
        auth.signOut();
    };

    addNew = () => {
        this.setState({show: true});
    };

    handleClose = () => {
        this.setState({show: false});
    };

    sortBy = (sortFunction) => {
      this.setState({sortBy: sortFunction});
    };

    // TODO: Add functionality for search
    render() {
        return (
            <div>
                <BackTop />
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Row>
                            <Col span={1}><img src={StockSvg} style={{height: "31px"}} alt="logo"/></Col>
                            <Col span={19}><h1 style={{color: "whitesmoke"}}>Warehouse</h1></Col>
                            <Col span={1}><Button onClick={this.addNew} type="primary" shape="circle" icon="plus"  htmlType="button"/></Col>
                            <Col span={1}><Sort sortBy={this.sortBy}/></Col>
                            <Col span={1}><Button shape="circle" icon="search"  htmlType="button"/></Col>
                            <Col span={1}><Button onClick={this.signOut} type="danger" shape="circle" icon="logout" htmlType="button" /></Col>
                        </Row>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <ItemAdd show={this.state.show} handleClose={this.handleClose} />
                        <ItemCards sortBy={this.state.sortBy} />
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Warehouse;