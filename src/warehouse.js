import React from 'react';
import { auth } from "./firebase";
import {Layout, Button, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import Items from "./items"

const {Header, Content} = Layout;


class Warehouse extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        auth.signOut()
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <Row>
                            <Col span={22}><h1 style={{color: "whitesmoke"}}>Warehouse</h1></Col>
                            <Col span={2}><Button onClick={this.signOut} type="danger" htmlType="button">Sign Out</Button></Col>
                        </Row>
                    </Header>
                    <Content>
                        <Items />
                    </Content>
                </Layout>
            </div>

        );
    }
}

export default Warehouse;