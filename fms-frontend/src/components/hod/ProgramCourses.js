import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import './ProgramCourses.css';

export default function ProgramCourses({ programId }) {
    const [courseCategories, setCourseCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editCourse, setEditCourse] = useState(null);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/program/${programId}/course-categories/`)
            .then((response) => response.json())
            .then((data) => {
                setCourseCategories(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching course categories:', error));
    }, [programId]);

    const handleEditClick = (course) => {
        setEditCourse(course);
    };

    const handleCancel = () => {
        setEditCourse(null);
    };

    const handleChange = (e) => {
        setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        fetch(`http://127.0.0.1:8000/api/course-categories/${editCourse.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editCourse),
        })
            .then((response) => response.json())
            .then((updatedCourse) => {
                setCourseCategories((prev) =>
                    prev.map((course) => (course.id === updatedCourse.id ? updatedCourse : course))
                );
                setEditCourse(null);
            })
            .catch((error) => console.error('Error updating course:', error));
    };

    if (loading) {
        return <div>Loading Courses...</div>;
    }

    return (
        <div className='course-table-container'>
            <table className='course-table'>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Credits</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courseCategories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.course_id}</td>
                            <td>{category.course_name}</td>
                            <td>{category.credits}</td>
                            <td>{category.category}</td>
                            <td>
                                <button className='edit-btn' onClick={() => handleEditClick(category)}>
                                    <FiEdit className='edit-icon' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editCourse && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Edit Course</h2>
                        <label>Course ID</label>
                        <input type='text' name='course_id' value={editCourse.course_id} onChange={handleChange} />
                        <label>Course Name</label>
                        <input type='text' name='course_name' value={editCourse.course_name} onChange={handleChange} />
                        <label>Credits</label>
                        <input type='number' name='credits' value={editCourse.credits} onChange={handleChange} />
                        <label>Category</label>
                        <input type='text' name='category' value={editCourse.category} onChange={handleChange} />
                        <div className='modal-buttons'>
                            <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
                            <button className='update-btn' onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
