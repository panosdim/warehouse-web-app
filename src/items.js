import React from 'react';
import {db, auth} from "./firebase";
import {sortByDate} from "./utils";
import {Card, Row, Col} from 'antd';
import 'antd/dist/antd.css';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.currentUser = auth.currentUser;
        this.state = {
            items: []
        };
        this.itemsRef = null;
    }

    componentDidMount() {
        this.itemsRef = db.ref('/items/' + this.currentUser.uid).orderByChild("exp_date");
        this.itemsRef.on('child_added', snap => {
            let item = snap.val();
            item.key = snap.key;
            const previousItems = this.state.items;
            previousItems.push(item);
            this.setState({
                items: previousItems
            });
        });
    }

    componentWillUnmount() {
        this.itemsRef.off();
    }

    itemDetails = (key) => {
        console.log(key);
    };

    render() {
        const gridLeftAligned = {
            width: '50%',
            textAlign: 'left',
        };
        const gridRightAligned = {
            width: '50%',
            textAlign: 'right',
        };
        const divLayout = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
        };
        /**
         * @typedef {Object} item
         * @property {string} exp_date - Expiration Date.
         * @property {string} amount - Amount of item.
         * @property {string} box - The box where item is stored.
         * @property {string} name - The name of the item.
         * @property {string} key - The key of the item in Firebase Database.
         */
        const listOfItems = this.state.items.sort(sortByDate).map(item => {
                let color = "#fff";
                let extra = <span>Expiration Date: <span style={{fontWeight: 500}}>{item.exp_date}</span></span>;
                if (item.exp_date) {
                    const today = new Date();
                    const nextMonthLastDay = new Date(today.getFullYear(), today.getMonth() + 2, 0);
                    const date = new Date(item.exp_date);
                    if (date.getTime() < today.getTime()) {
                        color = "#ff4d4f";
                    }

                    if (date.getTime() < nextMonthLastDay.getTime() && date.getTime() > today.getTime()) {
                        color = "#ffec3d";
                    }
                } else {
                    extra = "";
                }
                return <Card
                    onClick={() => this.itemDetails(item.key)}
                    key={item.key}
                    title={item.name}
                    extra={extra}
                    style={{margin: 10, width: 500, backgroundColor: color}}
                    hoverable={true}>
                    <Row>
                        <Col style={gridLeftAligned} span={12}>Amount: {item.amount}</Col>
                        <Col style={gridRightAligned} span={12}>Box: {item.box}</Col>
                    </Row>
                </Card>
            }
        );
        return (
            <div style={divLayout}>
                {listOfItems}
            </div>
        );
    }
}

export default Items;