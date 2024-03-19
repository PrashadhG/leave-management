const { Student, Faculty } = require('../schema');

const facultyDepartment = async(req, res) => {
    const userId = req.userId;

    try {
        const student = await Student.findById(userId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const facultyList = await Faculty.find({ department: student.department },'name');
        res.json({ facultyList });
    } catch (error) {
        console.error('Error fetching faculty:', error);
        res.status(500).json({ message: 'Failed to fetch faculty' });
    }
}


const updateFaculty = async (req, res) => {
    const id = req.params.id;
    try {
        await Student.findByIdAndUpdate(id, { faculty: req.body.faculty });
        // const student = Student.find({_id : id});


        res.json({ faculty: req.body.faculty  , message: 'Faculty updated successfully' });
    } catch (error) {
        console.error('Error updating faculty:', error);
        res.status(500).json({ message: 'Failed to update faculty' });
    }
};

module.exports = { facultyDepartment, updateFaculty };
