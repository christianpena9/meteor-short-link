import React from 'react';

import { Links } from '../api/links';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

class Link extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <PrivateHeader title="Your Links"/>
                <LinksList/>
                <AddLink/>
            </div>
        );
    }
}

export default Link;