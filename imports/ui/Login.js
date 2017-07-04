import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login to Short Lnk</h1>
                
                login form here
                <Link to='/signup'>Have an account?</Link>
            </div>
        );
    }
}

export default Login;