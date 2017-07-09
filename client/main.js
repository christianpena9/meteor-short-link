import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

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

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});

/*
    Stateless functional components (presentational component)
    Note: Below component is simple and it's not smart, all it really does is
    render some data to the data and that's it. No logic found here.
*/
// import React from 'react';
// const MyComponent = (props) => {
//     return(
//         <div>
//             <h1>MyComponent is here! {props.name}</h1>
//         </div>
//     );
// };

/*
    Below are examples on calling meteor methods
    Below Meteor.call take 2 parameters. First one is the name of the method
    as a string and second is a callback function. The callback function
    will let us know if the call failed (err) or passed (res). You can also
    add a parameter to this method which will be in between the method name
    and the callback function. 
*/
/*
Meteor.call('greetUser', (err, res) => {
    console.log('GreetUser arguments', err, res);
});
Meteor.call('addNumber', 1, 1, (err, res) => {
    console.log('AddNumber arguments', err, res);
});
*/