import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        };
        /*
            Below is a Custom Method binding 'this' so we don't have call it
            later on.
        */
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        // const url = this.refs.url.value.trim();
        // const url = this.state.url;
        const { url } = this.state;
        
        Meteor.call('links.insert', url, (err, res) => {
            
            /* Below code will run if there is no error */
            if(!err) {
                this.setState({ url: '', isOpen: false, error: '' });
            } else {
                this.setState({ error: err.reason });
            }
        });
        
        // if(url) {
        //     
        //     
        //     /*
        //         Below is old code that does not work any more since we removed
        //         insecure.
        //      */
        //     //Links.insert({ url, userId: Meteor.userId() });
        //     //this.refs.url.value = '';
        // }
    }
    
    onChange(e) {
        this.setState({
            // Added trim below since URL should not have spaces
            // url: e.target.value.trim()
            url: e.target.value
        });
    }
    
    /* Below method opens the modal */
    openModal() {
        /*
            Below we just need to call the name of the state we want to change
            with the value we want to change it to.
        */
        this.setState({ isOpen: true });
    }
    
    /* Below method closes the modal */
    closeModal() {
        this.setState({ isOpen: false, url: '', error: '' });
    }
    
    render() {
        return(
            <div>
                <button onClick={this.openModal}>+ Add Link</button>
                <Modal isOpen={this.state.isOpen} contentLabel='Add Link'>
                    <h1>Add Link</h1>
                
                    {/*
                        Below code will return false if the sting is empty. Undefined
                        will not render the code (won't make it appear).
                    */}
                    { this.state.error ? <p>{this.state.error}</p> : undefined }
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
                    <button onClick={this.closeModal}>Cancel</button>
                </Modal>
            </div>
        );
    }
}

export default AddLink;