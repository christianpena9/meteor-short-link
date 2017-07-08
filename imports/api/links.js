import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

/*
    This file aka links.js runs on both the Client and the Server. But on the
    other hand the method Meteor.pusblish is only available on the server. What
    this means is that we can use some boolean to check if on the server to then
    run the below code.
*/

if (Meteor.isServer) {
    /*
        Meteor.publish requires two parameters, name of publish and function on
        what needs to be returned.
        Note: You can't use Meteor.userId() when using publish and you can't use
        fat arrow notation (=>). You will need to use the regular function call
        (function() {}) so you can access the 'this' binding. Fat arrow does not
        have the 'this' binging to it.
    */
    Meteor.publish('links', function () {
        return Links.find({ userId: this.userId });
    });
}

/*
    Below methods will be used on both the server and on the client. Methods is
    how we insert, remove and update the database.
*/


// Below code is another way to export Links Collection.
/*
export {
    Links
};
*/