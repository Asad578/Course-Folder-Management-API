import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import './StudentDashboard.css';

function StudentDashboard() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const studentId = 1;
        // Fetch enrolled courses for the student
        fetch(`http://127.0.0.1:8000/api/students/${studentId}/enrolled-courses/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch enrolled courses");
                }
                return response.json();
            })
            .then(data => {
                setEnrolledCourses(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching enrolled courses:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <SideBar />
            <div className='dashboard'>
                <div className='heading'>
                    <h2>In Progress</h2>
                </div>
                <div className='content'>
                    {enrolledCourses.length > 0 ? (
                        <div className='course-list'>
                            {enrolledCourses.map(folder => (
                                <div className="course-item" key={folder.id}>
                                    <Link to={`/student-courses/folders/${folder.id}/${folder.folder_name}`}>
                                        <div className='course-clr'></div>
                                    </Link>
                                    <div className='course-dtl'>
                                    <Link to={`/student-courses/folders/${folder.id}/${folder.folder_name}`}>
                                            <h4>{folder.folder_name}</h4>
                                        </Link>
                                        <p>{folder.credits} Credits | {folder.course_offering.session}</p>
                                        <div className='progress-con'>
                                            <div className='progress-per'>20% completed</div>
                                            <div className='progress-bar'>
                                                <div className='progress-bar-fill'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='no-enrollments'>
                            <p>No enrollments yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;