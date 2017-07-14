import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
        
        /*
            Method 2. Using function defined in constructor
            URL: http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html
        */
        this.setVisibility = this.setVisibility.bind(this);
    }
    
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        
        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            setTimeout(() => {
                this.setState({ justCopied: false });
            }, 1000);
        }).on('error', () => {
            alert('Unable to copy. Please manually copy the link');
        });
    }
    
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    
    /*
        Below function can be put into button onClick but this keeps the button
        a bit more clear when looking at return statement.
    */
    setVisibility() {
        Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
    }
    
    renderStats() {
        /* Below code needs to be return so it can be viewed when rendered */
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;
        
        if(typeof this.props.lastVisitedAt === 'number') {
            let now = moment();
            
            visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`;
        }
        
        return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
    }
    
    render() {
        let copyText;
        this.state.justCopied ? copyText = 'Copied' : copyText = 'Copy';
        let visibleText;
        this.props.visible ? visibleText = 'Hide' : visibleText = 'Unhide';
        
        return(
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                <p>{this.props.visible.toString()}</p>
                {this.renderStats()}
                <a href={this.props.shortUrl} target='_blank'>Visit</a>
                <button ref='copy' data-clipboard-text={this.props.shortUrl}>{copyText}</button>
                <button onClick={this.setVisibility}>{visibleText}</button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
}

export default LinksListItem;