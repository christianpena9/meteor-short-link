import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

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
        
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        
        if (password.length < 9) {
            /* We return here so we can stop the code from continuing */
            return this.setState({error: 'Password must be more than 8 characters long'});
        }
        
        Accounts.createUser({email, password}, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        });
        
        e.target.email.value = '';
        e.target.password.value = '';
    }
    
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join Short Lnk</h1>
                    
                    {/* Below the undefined or null is ignored by JSX */}
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    
                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        {/* Below we can reference the value outside our component */}
                        <input type="email" ref="email" name="email" placeholder="Email" autoComplete="off"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button>Create Account</button>
                    </form>
                    
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
} // End of Signup class

export default Signup;