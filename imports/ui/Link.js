import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Links } from '../api/links';

class Link extends React.Component {
    constructor() {
        super();
        
        /*
            Below is a Custom Method binding 'this' so we don't have call it
            later on.
        */
        this.onLogout = this.onLogout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    /* Below is a Custom Method for logging out */
    onLogout() {
        Accounts.logout();
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        const url = this.refs.url.value.trim();
        
        if(url) {
            Links.insert({ url });
            this.refs.url.value = '';
        }
    }
    
    render() {
        return (
            <div>
                <h1>Your Links</h1>
                <button onClick={this.onLogout}>Logout</button>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" ref="url" placeholder="URL" autoComplete="off"/>
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}

export default Link;