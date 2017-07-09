import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        
        this.clipboard.on('success', () => {
            alert('It worked!');
        }).on('error', () => {
            alert('Unable to copy. Please manually copy the link');
        });
    }
    
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    
    render() {
        return(
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                <button ref='copy' data-clipboard-text={this.props.shortUrl}>Copy</button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
}

export default LinksListItem;