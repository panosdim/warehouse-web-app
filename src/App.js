import React, {Component} from 'react';
import './App.css';
import { auth } from "./Firebase";
import SignIn from './SignIn'
import Warehouse from "./Warehouse";

class App extends Component {
    // The component's Local state.
    state = {
        isSignedIn: false // Local signed-in state.
    };

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = auth.onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (this.state.isSignedIn) {
            return (
                <Warehouse/>
            );
        }
        return (
            <SignIn/>
        );
    }
}

export default App;
