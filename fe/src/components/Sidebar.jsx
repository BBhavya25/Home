import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate('/doctors')}>Doctors</li>
        <li onClick={() => navigate('/patients')}>Patients</li>
        <li onClick={() => navigate('/appointments')}>Appointments</li>
      </ul>
    </div>
  );
}

export default Sidebar;
