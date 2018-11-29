import React from 'react';
import {db, auth} from "./firebase";
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
        this.itemsRef = db.ref('/items/' + this.currentUser.uid);
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

    render() {
        const listOfItems = this.state.items.map(item =>
            <li key={item.key}>{item.name}</li>
        );
        return (
            <div><ul>{listOfItems}</ul></div>
        );
    }
}

export default Items;