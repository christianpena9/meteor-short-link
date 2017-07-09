import { Meteor } from 'meteor/meteor';

import '../imports/api/users';
import '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
    
});

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