const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        enum: ['IT', 'CSE', 'ECE', 'MECH', 'EEE', 'AI&DS'],
        required: true,
    },
    year: {
        type: Number,
        min: 1,
        max: 4,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        default: null,
    },
});


const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        enum: ['IT', 'CSE', 'ECE', 'MECH', 'EEE', 'AI&DS'],
        required: true,
    },
});

const leaveRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    days:{
        type: Number,
        min: 1,
        max: 15,
        required: true

    },
    reason: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        enum: ['casual', 'medical', 'onDuty'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
});

const leaveApprovalSchema = new mongoose.Schema({
    leaveRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaveRequest',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    days:{
        type: Number,
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    approvalDate: {
        type: Date,
        default: Date.now,
    },
});

const leavesTakenSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    casualLeavesTaken: {
        type: Number,
        default: 0,
    },
    medicalLeavesTaken: {
        type: Number,
        default: 0,
    },
    onDutyLeavesTaken: {
        type: Number,
        default: 0,
    },
});




const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
const LeaveApproval = mongoose.model('LeaveApproval', leaveApprovalSchema);
const LeaveTaken = mongoose.model('LeavesTaken', leavesTakenSchema);

module.exports = { Student, Faculty, LeaveRequest, LeaveApproval, LeaveTaken};
