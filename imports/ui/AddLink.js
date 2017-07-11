import React from 'react';
import { Meteor } from 'meteor/meteor';

class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
        /*
            Below is a Custom Method binding 'this' so we don't have call it
            later on.
        */
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        // const url = this.refs.url.value.trim();
        // const url = this.state.url;
        const { url } = this.state;
        
        if(url) {
            Meteor.call('links.insert', url, (err, res) => {
                if(!err) {
                    this.setState({ url: '' });
                }
            });
            
            /*
                Below is old code that does not work any more since we removed
                insecure.
             */
            //Links.insert({ url, userId: Meteor.userId() });
            //this.refs.url.value = '';
        }
    }
    
    onChange(e) {
        this.setState({
            // Added trim below since URL should not have spaces
            // url: e.target.value.trim()
            url: e.target.value
        });
    }
    
    render() {
        return(
            <div>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        //ref="url"
                        placeholder="URL"
                        autoComplete="off"
                        value={this.state.url}
                        onChange={this.onChange}
                    />
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}

export default AddLink;