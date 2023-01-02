const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const StudentsInfo = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    gender: {
        type: String
    },
    pass: {
        type: Boolean,
        default: false
    
    }
    // add in geo location
});

const student = mongoose.model('student', StudentsInfo);

module.exports = student;
