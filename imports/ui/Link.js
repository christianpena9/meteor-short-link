import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Links } from '../api/links';
import LinksList from './LinksList';

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
            Meteor.call('links.insert', url);
            
            /*
                Below is old code that does not work any more since we removed
                insecure.
             */
            //Links.insert({ url, userId: Meteor.userId() });
            this.refs.url.value = '';
        }
    }
    
    render() {
        return (
            <div>
                <h1>Your Links</h1>
                <button onClick={this.onLogout}>Logout</button>
                <LinksList/>
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