import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

class PrivateHeader extends React.Component {
    constructor(props) {
        super(props);
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
        return(
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.onLogout}>Logout</button>
            </div>
        );
    }
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;