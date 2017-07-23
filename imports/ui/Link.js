import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters'

/*
    Note: Below we do not create a variable and assign it to the function because
    we are not dealing with props so there is no need to have a function referenced
    to a name.
*/
export default () => {
    return(
        <div>
            <PrivateHeader title="Your Links"/>
            <div className="page-content">
                <LinksListFilters/>
                <AddLink/>
                <LinksList/>
            </div>
        </div>
    );
};

// class Link extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     
//     render() {
//         return (
//             <div>
//                 <PrivateHeader title="Your Links"/>
//                 <LinksList/>
//                 <AddLink/>
//             </div>
//         );
//     }
// }
// 
// export default Link;