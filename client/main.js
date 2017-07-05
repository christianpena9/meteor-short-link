import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

/* Below are Components Imports */
import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

const unauthenticatedPages = ['/', 'signup'];
const authenticatedPages = ['/links'];

/*
    Below code checks if the user is logged in, if they are then we route them
    to links (/links) page and keeps them there.
*/
const onEnterPublicPage = () => {
    if(Meteor.userId()) {
        browserHistory.replace('/links');
    }
};

/*
    Below code checks if the user is not logged in, if not then we route them
    back to the login (/) page and keeps them there
 */
const onEnterPrivatePage = () => {
    if(!Meteor.userId()) {
        browserHistory.replace('/');
    }
};

/* Below are routes we define for our app */
const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Login} onEnter={onEnterPublicPage}/>
        <Route path='/signup' component={Signup} onEnter={onEnterPublicPage}/>
        <Route path='/links' component={Link} onEnter={onEnterPrivatePage}/>
        <Route path='*' component={NotFound}/>
    </Router>
);

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
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    
    /*
        If isUnauthenticatedPage and isAuthenticated is true then we will re-
        direct the user to /links page.
        If isAuthenticatedPage is true and isAuthenticated is false then we
        should re-direct users to root path
    */
    if(isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/links');
    } else if(isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});