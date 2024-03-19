const express = require('express');
const router = express.Router();
const { submitLeaveRequest, getLeaveRequests, acceptLeaveRequest, declineLeaveRequest, getName } = require('../controllers/leaveController');

router.post('/leave-request', submitLeaveRequest);
router.get('/leave-requests', getLeaveRequests);
router.get('/name',getName)
router.put('/leave-request/accept/:id', acceptLeaveRequest);
router.put('/leave-request/decline/:id', declineLeaveRequest);

module.exports = router;
