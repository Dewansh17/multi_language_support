import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome to Your Dashboard</h1>
            </header>
            <main className="dashboard-content">
                <p>This is your dashboard where you can manage your profile, view notifications, and more.</p>
                {/* Add more dashboard content here */}
            </main>
        </div>
    );
};

export default Dashboard;
