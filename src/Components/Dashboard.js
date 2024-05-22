import React, { useContext } from 'react';
import '../output.css';
import { UserContext } from './UserContext';

const Dashboard = () => {
    const {name} = useContext(UserContext);
   return (
        <div className="flex">
            <aside className="sidebar">
               <h2 className="text-2xl font-bold mb-6">Welcome {name}</h2>
                <nav>
                    <a href="/addsite" className="sidebar-link">Add Sites</a>
                    <a href="/sitelist" className="sidebar-link">View Sites</a>
                    <a href="#" className="sidebar-link">Add Guide</a>
                    <a href="#" className="sidebar-link">View Books</a>
                    <a href="#" className="sidebar-link">View Book Histories</a>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-blue-600 mb-8">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <a href='/addsite'> <div className="card">
                        <div className="card-title">Add Sites</div>
                        <div className="card-body">
                            <p>Manage the sites available for tours.</p>
                        </div>
                   </div>
                   </a>
                   <a href='/sitelist'>
                    <div className="card">
                        <div className="card-title">View Sites</div>
                        <div className="card-body">
                            <p>View and edit existing sites.</p>
                        </div>
                       </div>
                    </a>
                    <div className="card">
                        <div className="card-title">Add Guide</div>
                        <div className="card-body">
                            <p>Add new guides to your team.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">View Books</div>
                        <div className="card-body">
                            <p>View current bookings.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">View Book Histories</div>
                        <div className="card-body">
                            <p>Review past bookings.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;