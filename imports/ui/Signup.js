import React from 'react';
import { Link } from 'react-router';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        
        /*
            Method 2. Using function defined in constructor
            URL: http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html
        */
        this.onSubmit = this.onSubmit.bind(this);
    } // End of constructor
    
    
    onSubmit(e) {
        e.preventDefault();
        
        this.setState({
            error: 'Something went wrong.'
        });
    }
    
    render() {
        return (
            <div>
                <h1>Join Short Lnk</h1>
                
                {/* Below the undefined or null is ignored by JSX */}
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                
                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" placeholder="Email" autoComplete="off"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <button>Create Account</button>
                </form>
                
                <Link to="/">Already have an account?</Link>
            </div>
        );
    }
} // End of class

export default Signup;