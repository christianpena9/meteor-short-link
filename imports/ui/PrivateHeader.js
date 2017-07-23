import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

// class PrivateHeader extends React.Component {
//     constructor(props) {
//         super(props);
//         /*
//             Below is a Custom Method binding 'this' so we don't have call it
//             later on.
//         */
//         this.onLogout = this.onLogout.bind(this);
//     }
//     
//     /* Below is a Custom Method for logging out */
//     onLogout() {
//         Accounts.logout();
//     }
//     
//     render() {
//         return(
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <button onClick={this.onLogout}>Logout</button>
//             </div>
//         );
//     }
// }

/*
    Note: Below code we do define a variable name to the function because we need
    to reference the props values for the propTypes feature and then we would
    need to eport the variable.
*/
const PrivateHeader = (props) => {
    // Below is another way and then call {onLogout} in the onClick
    // const onLogout = () => Accounts.logout();    
    return(
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
            </div>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;