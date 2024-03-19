import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar';
import './home.css';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is already logged in

    const handleSignout = async () => {
        try {
            await axios.post('http://localhost:4000/auth/signout', null, {
                headers: {
                    Authorization: sessionStorage.getItem('token')
                }
            });
            console.log('Sign-out successful');
            sessionStorage.removeItem('token');
            console.log('Token removed from session storage');
            setIsLoggedIn(false); // Update state to reflect logged out status
            window.location.href = '/'; // Redirect to login page only if signout was successful
        } catch (error) {
            console.error('Sign-out failed:', error);
            // Handle signout failure if needed
        }
    };

    if (!isLoggedIn) {
        window.location.href = '/'; // Redirect to login page if not logged in
        return null; // Return null to prevent rendering the rest of the component
    }

    return (
        <div className='home-screen'>
            <div className='home-header'>
                <p className='dashboard-text'>Dashboard</p>
            </div>
            <Sidebar />
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    );
};

export default Home;
