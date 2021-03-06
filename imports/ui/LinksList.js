import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    } // End of constructor
    
    /*
        Below function will run when the components live cycle occurs that
        relates to the function below. Each Component has these life cycle. As
        soon as the below render happens then componentDidMount will run auto-
        matically.
    */
    componentDidMount() {
        console.log('componentDidMount LinksList');
        /* We are checking if the Links database changes */
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links });
        });
    } // End of componentDidMount
    
    /*
        Below function will run right before a componet goes away.
    */
    componentWillUnmount() {
        console.log('componentWillUnmount LinksList');
        this.linksTracker.stop();
    } // End of componentWillUnmount
    
    /*
        Note: For some reason below we need both returns, not fully sure why yet
        but this is something that I will need to look into more.
        Below function will loop through the links array and then print each
        value on a <p> tag to the screen.
    */
    renderLinksListItems() {
        if (this.state.links.length === 0) {
            return(
                <div className="item">
                    <p className="item__status-message">No Links Found.</p>
                </div>
            );
        }
        
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
            // return <p key={link._id}>{link.url}</p>;
        });
    }
    
    render() {
        return(
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}

export default LinksList;