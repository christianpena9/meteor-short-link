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
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleInputOnFocus = this.handleInputOnFocus.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        // const url = this.refs.url.value.trim();
        // const url = this.state.url;
        const { url } = this.state;
        
        Meteor.call('links.insert', url, (err, res) => {
            
            /* Below code will run if there is no error */
            if(!err) {
                this.handleModalClose();
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
    handleModalOpen() {
        /*
            Below we just need to call the name of the state we want to change
            with the value we want to change it to.
        */
        this.setState({ isOpen: true });
    }
    
    /* Below method closes the modal */
    handleModalClose() {
        this.setState({ isOpen: false, url: '', error: '' });
    }
    
    /*
        Below method tells the modal what input needs to be focus. Note that we
        can do inline fat arrow function to call the function in a much cleaner
        way. Want to keep things consistent so created a method.
    */
    handleInputOnFocus() {
        this.refs.url.focus();
    }
    
    render() {
        return(
            <div>
                <button className="button" onClick={this.handleModalOpen}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel='Add Link'
                    onAfterOpen={this.handleInputOnFocus}
                    onRequestClose={this.handleModalClose}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    <h1>Add Link</h1>
                
                    {/*
                        Below code will return false if the sting is empty. Undefined
                        will not render the code (won't make it appear).
                    */}
                    { this.state.error ? <p className="error-message">{this.state.error}</p> : undefined }
                    <form onSubmit={this.onSubmit} className="boxed-view__form">
                        <input
                            type="text"
                            ref="url"
                            placeholder="URL"
                            autoComplete="off"
                            value={this.state.url}
                            onChange={this.onChange}
                        />
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default AddLink;