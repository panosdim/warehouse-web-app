import React from 'react';
import firebase from './firebase';
import {Layout, Button, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import './warehouse.css'

const {Header} = Layout;


class Warehouse extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        firebase.auth().signOut()
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <Row>
                            <Col span={22}><h1 style={{color: "whitesmoke"}}>Warehouse</h1></Col>
                            <Col span={2}><Button onClick={this.signOut} type="danger">Sign Out</Button></Col>
                        </Row>
                    </Header>
                </Layout>
            </div>

        );
    }
}

export default Warehouse;