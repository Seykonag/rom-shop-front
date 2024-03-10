import React from 'react';
import LoginPage from './components/auth/login'
import HomePage from './components/home';
import RegistrationPage from './components/auth/registration';
import './App.css';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/registration" element={<RegistrationPage />}/>
      </Routes>
    </div>
  );
}

export default App;
