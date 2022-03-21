import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { BackTop, Button, Col, Layout, Row } from 'antd';
import 'antd/dist/antd.css';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { firebase } from "./Firebase";
import ItemAdd from "./ItemAdd";
import ItemCards from "./ItemCards";
import Search from "./Search";
import Sort from "./Sort";
import { sortByDateAsc } from "./SortFunctions";
import StockSvg from './stock.svg';

const {Header, Content} = Layout;

class Warehouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            sortBy: sortByDateAsc,
            search: (item) => item
        };
    }

    signOut = () => {
        getAuth(firebase).signOut();
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

    search = (searchTerm) => {
        if (searchTerm) {
            this.setState({search: (item) => item.name.includes(searchTerm)});
        } else {
            this.setState({search: (item) => item});
        }
    };

    render() {
        return (
            <div>
                <BackTop />
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Row>
                            <Col span={1}><img src={StockSvg} style={{height: "31px"}} alt="logo"/></Col>
                            <Col span={19}><h1 style={{color: "whitesmoke"}}>Warehouse</h1></Col>
                            <Col span={1}><Button onClick={this.addNew} type="primary" shape="circle" icon={<PlusOutlined />} htmlType="button" /></Col>
                            <Col span={1}><Sort sortBy={this.sortBy}/></Col>
                            <Col span={1}><Search search={this.search}/></Col>
                            <Col span={1}><Button onClick={this.signOut} type="danger" shape="circle" icon={<LogoutOutlined />} htmlType="button" /></Col>
                        </Row>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <ItemAdd show={this.state.show} handleClose={this.handleClose} />
                        <ItemCards sortBy={this.state.sortBy} search={this.state.search}/>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Warehouse;