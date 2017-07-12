import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

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
    Note: We are not using fat arrow (=>) here again because we want to have
    access to the 'this' binding. We are using ES6 syntax where we remove the
    function word.
    Note: Meteor has a naming convention but you can name them anything you want.
    Naming convention is: 'resource.action' for example 'links.insert'
*/
Meteor.methods({
    /*
        Note: in objects you can't use the dot(.) but if you wrap it in a string
        then it's fair game.
    */
    'links.insert'(url) {
        
        // We check to make sure user is logged in, if not then we throw an error.
        if(!this.userId) {
            // if we throw error then we stop execution. Rest of code wont' run.
            throw new Meteor.Error('not-authorized');
        }
        
        /* Below we check the url to make sure it's formated how we expect it */
        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });
        
        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.setVisibility'(_id, visible) {
        // We check to make sure user is logged in, if not then we throw an error.
        if(!this.userId) {
            // if we throw error then we stop execution. Rest of code wont' run.
            throw new Meteor.Error('not-authorized');
        }
        
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible });
        
        Links.update({
            _id,
            userId: this.userId
        },{
            $set: { visible }
        });
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });
        
        Links.update({ _id } , {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        });
    }
});

/*
    Below are examples on how to use meteor methods.
    We do a check first to see if it fails, if it does then we throw an
    error and the code will stop. If there is no error then we return
    the values.
*/
/*
greetUser(name) {
    console.log('greetUser is running');
    
    if(!name) {
        throw new Meteor.Error('invalid-arguments', 'Name is required');
    }
    
    return `Hello ${name}!`;
},
addNumber(a,b) {
    if(typeof a !== 'number' || typeof b !== 'number') {
        throw new Meteor.Error('invalid-arguments', 'Expecting two numbers');
    }
    
    return a + b;
}
*/

// Below code is another way to export Links Collection.
/*
export {
    Links
};
*/