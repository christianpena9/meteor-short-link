import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

/* Below are Components Imports */
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

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

const onAuthChange = (isAuthenticated) => {
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

export {
    onAuthChange,
    routes
};