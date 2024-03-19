import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./slidebar.css"

const Sidebar = () => {
    const [studentName, setStudentName] = useState('');
    
    useEffect(() => {
        const token = sessionStorage.getItem('token');

        axios.get('http://localhost:4000/leave/name', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setStudentName(response.data.name);
        })
        .catch(error => {
            console.error('Error fetching student name:', error);
        });
    }, []);

    return (
        <div className="frame">
            <div className='ellipse'>
                <p className='first-letter'>{studentName.charAt(0)}</p>
            </div>
            <div className='user-name'>Hello, {studentName}</div>
        </div>
    );
};

export default Sidebar;
