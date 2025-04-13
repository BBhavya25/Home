import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    rooms: 0
  });
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Fetch stats and user data
  useEffect(() => {
    // Fetch stats from API
    setStats({
      patients: 1245,
      doctors: 48,
      appointments: 86,
      rooms: 32
    });

    // Get user data from localStorage (set during login)
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({
        name: userData.username,
        email: userData.email,  // Use the actual username from signup
        role: "Admin"  // You can modify this to use actual role from backend if available
      });
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Rest of your component remains the same...
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="hospital-logo">
            <img src="/hospital-logo.png" alt="Hospital Logo" />
          </div>
          <span className="hospital-name">MediCare Hospital</span>
        </div>
        <div className="navbar-right">
          <div 
            className="profile-icon" 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {user?.name.charAt(0)}
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-info">
                  <p className="username">{user?.name}</p>
                  <p className="user-role">{user?.role}</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="quick-links">
          <button 
            className="quick-link-btn"
            onClick={() => navigate('/add-patient')}
          >
            Add Patient
          </button>
          <button 
            className="quick-link-btn"
            onClick={() => navigate('/book-appointment')}
          >
            Book Appointment
          </button>
          <button 
            className="quick-link-btn"
            onClick={() => navigate('/view-doctors')}
          >
            View Doctors
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to MediCare Hospital</h1>
          <p className="hospital-description">
            Providing exceptional healthcare services since 1985. 
            Our hospital is equipped with state-of-the-art facilities 
            and a team of experienced medical professionals dedicated 
            to your well-being.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <h3>Total Doctors</h3>
              <p className="stat-value">{stats.doctors}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👨‍👩‍👧‍👦</div>
            <div className="stat-info">
              <h3>Total Patients</h3>
              <p className="stat-value">{stats.patients}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Today's Appointments</h3>
              <p className="stat-value">{stats.appointments}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏨</div>
            <div className="stat-info">
              <h3>Available Rooms</h3>
              <p className="stat-value">{stats.rooms}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;