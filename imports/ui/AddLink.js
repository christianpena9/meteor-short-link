import React from 'react';
import { Meteor } from 'meteor/meteor';

class AddLink extends React.Component {
    constructor(props) {
        super(props);
        /*
            Below is a Custom Method binding 'this' so we don't have call it
            later on.
        */
        this.onSubmit = this.onSubmit.bind(this);
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
        return(
            <div>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" ref="url" placeholder="URL" autoComplete="off"/>
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}

export default AddLink;