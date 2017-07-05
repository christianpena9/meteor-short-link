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

/* Below are routes we define for our app */
const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/links' component={Link}/>
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
        browserHistory.push('/links');
    } else if(isAuthenticatedPage && !isAuthenticated) {
        browserHistory.push('/');
    }
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});