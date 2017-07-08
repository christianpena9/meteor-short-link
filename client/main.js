import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import { routes, onAuthChange } from '../imports/routes/routes';
import { Links } from '../imports/api/links';

/*
    The Below code will run everytime Meteor.userId() changes. If it changes
    then Tracker.autorun() will run the function and run the below code.
*/
Tracker.autorun(() => {
    /*
        Below !! concerts value (string) to a boolean and ensures a boolean type
        URL: https://stackoverflow.com/questions/9284664/double-exclamation-points
    */
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

/* We are checking if the Links database changes */
Tracker.autorun(() => {
    let links = Links.find().fetch();
    console.log('New Links', links);
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});