import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import LandingPage from './pages/Landing/landing';
import Login from './pages/login/login';
import SignupStudent from './pages/signup/student/signup-student';
import SignupFaculty from './pages/signup/faculty/signup-faculty';
const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route exact path="/" element={< LandingPage />}></Route>
        <Route exact path="/login" element={< Login />}></Route>
        <Route exact path= "/signup-form-student" element= {<SignupStudent/>}></Route>
        <Route exact path= "/signup-form-faculty" element= {<SignupFaculty/>}></Route>
        <Route exact path="/home" element={< Home />}></Route>
      </Routes>

    </div>
    </BrowserRouter>
  );
};

export default App;
