import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

/*
    Below WebApp is used as a middleware to do some action depending on what the
    request is from the user.
    Req: short hand for request. It contains info on what header/url they came in
    Res: this allows us to respond to the current request
    next: is just a function and it allows the application to keep on moving
    Steps: request comes in, then run our middleware one at a time and then send
    them that page
*/
Meteor.startup(() => {
    WebApp.connectHandlers.use((req, res, next) => {
        console.log('This is from my custom middleware!');
        console.log(req.url, req.method, req.headers, req.query);
        
        
        next(); // need to call next so the page can continue to load
    });
});

/* Below we are changing the response information */

// Set HTTP status code
//res.statusCode = 404;
// Set HTTP headers
//res.setHeader('my-custom-header', 'Christian was here!');
// Set HTTP body
//res.write('<h1>This is my middleware at work!</h1>');
// End HTTP request
//res.end();

// code to run on server at startup

// const petSchema = new SimpleSchema({
//    name: {
//        type: String,
//        min: 1,
//        max: 200,
//        optional: true
//    },
//    age: {
//        type: Number,
//        min: 0
//    },
//    contactNumber: {
//        type: String,
//        optional: true,
//        regEx: SimpleSchema.RegEx.Phone
//    }
//    
// });
// 
// petSchema.validate({
//     age: 2,
//     contactNumber: '1234'
// });

/*
const employeeSchema = new SimpleSchema({
   name: {
       type: String,
       min: 1,
       max: 200
   },
   hourlyWage: {
       type: Number,
       min: 0
   },
   email: {
       type: String,
       regEx: SimpleSchema.RegEx.Email
   }
});

employeeSchema.validate({
    name: 'Christian',
    hourlyWage: 200,
    email: 'test@test.com'
});
*/