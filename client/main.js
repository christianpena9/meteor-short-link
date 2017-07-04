import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

/* Below are Components Imports */
import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';

Meteor.startup(() => {
    ReactDOM.render(<Signup/>, document.getElementById('app'));
});