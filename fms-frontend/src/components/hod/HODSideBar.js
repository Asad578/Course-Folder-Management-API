import React, { useEffect, useState } from 'react';
import './HODSideBar.css';
import { Link } from 'react-router-dom';

export default function HODSideBar() {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const role = 'hod';
        const user_id = 1;
        // Fetch programs from the backend
        fetch(`http://127.0.0.1:8000/api/program/?role=${role}&user_id=${user_id}`)
            .then(response => response.json())
            .then(data => setPrograms(data))
            .catch(error => console.error('Error fetching programs:', error));
    }, []);

    return (
        <>
            <div className="side-bar">
                <div className="side-items">
                    <ul>
                        <li>
                            <div className="side-item"><Link to='/hod-dashboard'>Dashboard</Link></div>
                        </li>
                        {programs.map(program => (
                            <li key={program.id}>
                                <div className="side-item">
                                    <Link to={`/program/${program.id}`}>{program.name}</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="logout-container">
                    <hr className="sb-separator" />
                    <div>
                        <button className="logout-btn">Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
}
