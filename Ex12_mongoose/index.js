// getting-started.js
var mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

studentSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`
})

const Student = mongoose.model('Student', studentSchema);
const newStudent = new Student({ firstName: 'John', lastName: 'Chen' });
console.log(newStudent);
console.log(newStudent.fullName);
newStudent.save();