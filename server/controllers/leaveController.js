const { LeaveRequest, LeaveApproval, LeaveTaken, Student,Faculty } = require('../schema');

const submitLeaveRequest = async (req, res) => {
    const { startDate, endDate, days, reason, type } = req.body;
    const userId = req.userId;

    try {
        const student = await Student.findById(userId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const newLeaveRequest = new LeaveRequest({
            user: userId,
            startDate,
            endDate,
            days,
            reason,
            type,
            faculty: student.faculty,
        });
        await newLeaveRequest.save();

        res.json({ message: 'Leave request submitted successfully' });
    } catch (error) {
        console.error('Error submitting leave request:', error);
        res.status(500).json({ message: 'Failed to submit leave request' });
    }
};

const getLeaveRequests = async (req, res) => {
    const userId = req.userId;
    const userType = req.userType;

    try {
        let leaveRequests;
        if (userType === 'faculty') {
            leaveRequests = await LeaveRequest.find({ faculty: userId }).populate('user', 'name email');
        } else {
            leaveRequests = await LeaveRequest.find({ user: userId });
        }

        res.json({ leaveRequests });
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        res.status(500).json({ message: 'Failed to fetch leave requests' });
    }
};

const acceptLeaveRequest = async (req, res) => {
    const id = req.params.id;

    try {
        const leaveRequest = await LeaveRequest.findById(id);

        if (leaveRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Leave request has already been processed' });
        }

        leaveRequest.status = 'approved';
        await leaveRequest.save();

        const newLeaveApproval = new LeaveApproval({
            leaveRequest: leaveRequest._id,
            startDate: leaveRequest.startDate,
            endDate: leaveRequest.endDate,
            days: leaveRequest.days,
            faculty: leaveRequest.faculty,
        });
        await newLeaveApproval.save();

        let leavesTaken = await LeaveTaken.findOne({ student: leaveRequest.user });

        if (!leavesTaken) {
            leavesTaken = new LeaveTaken({
                student: leaveRequest.user,
                casualLeaveTaken: 0,
                medicalLeaveTaken: 0,
                onDutyLeaveTaken: 0
            });
        }

        switch (leaveRequest.type) {
            case 'casual':
                leavesTaken.casualLeavesTaken += leaveRequest.days;
                break;
            case 'medical':
                leavesTaken.medicalLeavesTaken += leaveRequest.days;
                break;
            case 'onDuty':
                leavesTaken.onDutyLeavesTaken += leaveRequest.days;
                break;
            default:
                return res.status(400).json({ message: 'Invalid leave type' });
        }

        await leavesTaken.save();

        await LeaveRequest.findByIdAndDelete(id);

        res.json({ message: 'Leave request accepted successfully' });
    } catch (error) {
        console.error('Error accepting leave request:', error);
        res.status(500).json({ message: 'Failed to accept leave request' });
    }
};

const declineLeaveRequest = async (req, res) => {
    const id = req.params.id;

    try {
        const leaveRequest = await LeaveRequest.findById(id);

        if (leaveRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Leave request has already been processed' });
        }

        leaveRequest.status = 'rejected';
        await leaveRequest.save();

        await LeaveRequest.findByIdAndDelete(id);

        res.json({ message: 'Leave request declined successfully' });
    } catch (error) {
        console.error('Error declining leave request:', error);
        res.status(500).json({ message: 'Failed to decline leave request' });
    }
};

const getName = async (req, res) => {
    try {
        const userId = req.userId;
        const userType = req.userType;

        let user;
        if (userType === 'student') {
            user = await Student.findById(userId);
        } else if (userType === 'faculty') {
            user = await Faculty.findById(userId);
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const name = user.name;
        res.json({ name });
    } catch (error) {
        console.error('Error fetching student name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { submitLeaveRequest, getLeaveRequests, acceptLeaveRequest, declineLeaveRequest, getName };