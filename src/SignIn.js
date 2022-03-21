import { Layout } from 'antd';
import 'antd/dist/antd.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from './Firebase';

// Configure FirebaseUI.
const uiConfig = {
    // Popup signIn flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Email as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
    }
};

const { Content } = Layout;

class SignIn extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Content><StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /></Content>
                </Layout>
            </div>
        );
    }
}

export default SignIn;