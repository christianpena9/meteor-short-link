import React from 'react';
import { Accounts } from 'meteor/accounts-base';

class Link extends React.Component {
    constructor() {
        super();
        
        /*
            Below is a Custom Method binding 'this' so we don't have call it
            later on.
        */
        this.onLogout = this.onLogout.bind(this);
    }
    
    /* Below is a Custom Method for logging out */
    onLogout() {
        Accounts.logout();
    }
    
    render() {
        return (
            <div>
                <h1>Your Links</h1>
                <button onClick={this.onLogout}>Logout</button>
            </div>
        );
    }
}

export default Link;