import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import HODSideBar from "./HODSideBar";
import './HODProgram.css';

function HODProgram() {
    const { programId } = useParams(); // Get the program ID from the URL
    const [programName, setProgramName] = useState('');
    const [loading, setLoading] = useState(true);
    //for offerings
    const [isOfferingAdd, setIsOfferingAdd] = useState(false);
    const [newSession, setNewSession] = useState('');
    const [newStartingDate, setNewStartingDate] = useState('');
    const [newEndingDate, setNewEndingDate] = useState('');
    const [offerings, setOfferings] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [currentOffering, setCurrentOffering] = useState(null);
    const [session, setSession] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    //for courses
    const [iscourseAdd, setIscourseAdd] = useState(false);
    const [newCourseID, setNewCourseID] = useState('');
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseCredithours, setNewCourseCredithours] = useState('');
    const [newCourseCategory, setNewCourseCategory] = useState('');
    const [courseCategories, setCourseCategories] = useState([]);
    const [editCourse, setEditCourse] = useState(null);


    // Fetch program details
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/program/${programId}/`)
            .then((response) => response.json())
            .then((data) => {
                setProgramName(data.name);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching program details:', error));
    }, [programId]);

    // Fetch program offerings
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/program/${programId}/offerings/`) // Fetch offerings for the program
            .then((response) => response.json())
            .then((data) => {
                setOfferings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching offerings:', error);
                setLoading(false);
            });
    }, [programId]);
    
      // Function to open the edit modal with selected offering data
      const handleOfferingEditClick = (offering) => {
        setIsEditModalOpen(true);
        setCurrentOffering(offering);
        setSession(offering.session); // Set the initial value of the session
        setStartingDate(offering.starting_date); // Set the initial value of the starting date
        setEndingDate(offering.ending_date); // Set the initial value of the ending date
      };
    
      // Function to handle session change in input
      const handleSessionChange = (event) => {
        setSession(event.target.value);
      };

      // Function to handle starting date change    
    const handleStartingDateChange = (event) => {
        setStartingDate(event.target.value);
    };

    // Function to handle ending date change
    const handleEndingDateChange = (event) => {
        setEndingDate(event.target.value);
    };
    
      // Function to handle cancel (close the modal)
      const handleCancelClick = () => {
        setIsEditModalOpen(false);
        setSession('');
        setStartingDate('');
        setEndingDate('');
      };
    
      // Function to handle update (save changes to the db)
      const handleUpdateClick = () => {
        const updatedOffering = {
          ...currentOffering,
          session: session,
          starting_date: startingDate,
            ending_date: endingDate,
        };
    
        fetch(`http://127.0.0.1:8000/api/offerings/${currentOffering.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedOffering),
        })
          .then(response => response.json())
          .then(data => {
            // Update the offering list after successful update
            setOfferings((prevOfferings) =>
              prevOfferings.map((offering) =>
                offering.id === data.id ? data : offering
              )
            );
            setIsEditModalOpen(false);
            setSession('');
            setStartingDate('');
            setEndingDate('');
          })
          .catch((error) => console.error('Error updating offering:', error));
      };
    

    const handleAddOfferings = () => {
        setIsOfferingAdd(true); // Open the modal
    };

    const handleOfferingCancel = () => {
        setIsOfferingAdd(false); // Close the modal
        setNewSession(''); // Reset session input
        setNewStartingDate(''); // Reset starting date input
        setNewEndingDate(''); // Reset ending date input
    };

    const handleOfferingNext = () => {
        setIsSecondModalOpen(true);
    };

    const handleCourseSelection = (courseId) => {
        setSelectedCourses((prevSelected) =>
            prevSelected.includes(courseId)
                ? prevSelected.filter((id) => id !== courseId)
                : [...prevSelected, courseId]
        );
    };

    const handleCreateOfferingAndCourses = () => {
        const newOffering = {
            session: newSession,
            starting_date: newStartingDate,
            ending_date: newEndingDate,
            program: programId,
        };
    
        // First, create the offering
        fetch(`http://127.0.0.1:8000/api/program/${programId}/offerings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOffering),
        })
            .then((response) => response.json())
            .then((data) => {
                // Then, create the courses for this offering
                const coursePromises = selectedCourses.map((courseId) => {
                    const newCourse = {
                        course_title: courseId,
                        course_offering: data.id,
                    };
                    return fetch(`http://127.0.0.1:8000/api/offeringcourses/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newCourse),
                    });
                });
    
                // Wait for all course creation requests to complete
                Promise.all(coursePromises)
                    .then(() => {
                        setIsOfferingAdd(false);
                        setIsSecondModalOpen(false);
                        setNewSession('');
                        setNewStartingDate('');
                        setNewEndingDate('');
                        setSelectedCourses([]);
                        // refresh the offerings list
                        fetch(`http://127.0.0.1:8000/api/program/${programId}/offerings/`)
                            .then((response) => response.json())
                            .then((data) => setOfferings(data))
                            .catch((error) => console.error('Error fetching offerings:', error));
                    })
                    .catch((error) => console.error('Error creating courses:', error));
            })
            .catch((error) => console.error('Error creating offering:', error));
    };
    // Offerings handling ends


    // Fetch program courses
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

    const handleAddCourse = () => {
        setIscourseAdd(true); // Open the modal
    };

    const handleCourseCancel = () => {
        setIscourseAdd(false); // Close the modal
    };

    const handleCourseCreate = () => {
        const formData = {};
        formData['course_id'] = newCourseID;
        formData['course_name'] = newCourseName;
        formData['credits'] = newCourseCredithours;
        formData['category'] = newCourseCategory;
        formData['program'] = programId; // Send the program ID as reference


        fetch(`http://127.0.0.1:8000/api/program/${programId}/course-categories/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setCourseCategories((prevcourses) => [...prevcourses, data]); // Add new course to the list
                setIscourseAdd(false); // Close the modal
                // Reset form fields
                setNewCourseID('');
                setNewCourseName('');
                setNewCourseCredithours('');
                setNewCourseCategory('');
            })
            .catch((error) => console.error('Error creating course:', error));
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <HODSideBar />
            <div className='pr-dashboard'>
                <div className='main-heading'>
                    <h1>{programName}</h1>
                </div>
                <hr className="separator" />
                <div className='heading'>
                    <h2>Offerings</h2>
                    <button className='heading-btn' onClick={handleAddOfferings}>Add</button>
                </div>
                <div className='content'>
                <div className='of-tile-list'>
      {offerings.map((offering) => (
        <div className='of-tile-item' key={offering.id}>
          <Link to={`/offering-details/${offering.id}/${offering.session}`}>
            <div className='of-tile-clr'>{offering.session}</div>
          </Link>
            <button className='edit-btn' onClick={() => handleOfferingEditClick(offering)}>
              <FiEdit className='edit-icon'></FiEdit>
            </button>
        </div>
      ))}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Edit Offering</h4>
            <div>
              <label>Session</label>
              <input
                type="text"
                value={session}
                onChange={handleSessionChange}
              />
            </div>
            <div>
                <label>Starting Date</label>
                    <input
                        type="date"
                        value={startingDate}
                        onChange={handleStartingDateChange}
                    />
            </div>
            <div>
                <label>Ending Date</label>
                    <input
                        type="date"
                        value={endingDate}
                        onChange={handleEndingDateChange}
                    />
            </div>
            <div className='modal-buttons'>
              <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
              <button className='update-btn' onClick={handleUpdateClick}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
                </div>
                <hr className="separator" />
                <div className='heading'>
                    <h2>Courses</h2>
                    <button className='heading-btn' onClick={handleAddCourse} >Add</button>
                </div>
                <div className='content'>
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
                    
                </div>

                {/* Add Offering Modal */}
                {isOfferingAdd && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Create New Offering</h3>
                            <label>
                                Session:
                                <input
                                    type="text"
                                    value={newSession}
                                    onChange={(e) => setNewSession(e.target.value)}
                                    placeholder="Enter session (e.g., Fall 2025)"
                                />
                            </label>
                            <label>
                                Starting Date:
                                <input
                                    type="date"
                                    value={newStartingDate}
                                    onChange={(e) => setNewStartingDate(e.target.value)}
                                />
                            </label>
                            <label>
                                Ending Date:
                                <input
                                    type="date"
                                    value={newEndingDate}
                                    onChange={(e) => setNewEndingDate(e.target.value)}
                                />
                            </label>
                            <label>
                                Program:
                                <input
                                    type="text"
                                    value={programName}
                                    readOnly
                                />
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleOfferingCancel}>Cancel</button>
                                <button onClick={handleOfferingNext} disabled={!newSession.trim()}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isSecondModalOpen && (
    <div className="big-modal-overlay">
        <div className="modal big-modal">
            <h3>Select Courses for the Offering</h3>
            <div className="big-modal-container">
                <table className="course-table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Credits</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {courseCategories.map((category) => (
                        <tr key={category.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedCourses.includes(category.id)}
                                    onChange={() => handleCourseSelection(category.id)}
                                />
                            </td>
                            <td>{category.course_id}</td>
                            <td>{category.course_name}</td>
                            <td>{category.credits}</td>
                            <td>{category.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="modal-buttons">
                <button onClick={() => setIsSecondModalOpen(false)}>Cancel</button>
                <button onClick={handleCreateOfferingAndCourses}>Create</button>
            </div>
        </div>
    </div>
                )}


                {/* Add Course Modal */}
                {iscourseAdd && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Create New Course</h3>
                            <label>
                                Course ID:
                                <input
                                    type="text"
                                    value={newCourseID}
                                    onChange={(e) => setNewCourseID(e.target.value)}
                                    placeholder="Enter course id (e.g., 100012CS)"
                                />
                            </label>
                            <label>
                                Course Name:
                                <input
                                    type="text"
                                    value={newCourseName}
                                    onChange={(e) => setNewCourseName(e.target.value)}
                                    placeholder="Enter course name"
                                />
                            </label>
                            <label>
                                Credits:
                                <input
                                    type="number"
                                    value={newCourseCredithours}
                                    onChange={(e) => setNewCourseCredithours(e.target.value)}
                                />
                            </label>
                            <label>
                                Category:
                                <input
                                    type="text"
                                    value={newCourseCategory}
                                    onChange={(e) => setNewCourseCategory(e.target.value)}
                                    placeholder="e.g., core/elective"
                                />
                            </label>
                            <label>
                                Program:
                                <input
                                    type="text"
                                    value={programName}
                                    readOnly
                                />
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleCourseCancel}>Cancel</button>
                                <button onClick={handleCourseCreate} disabled={!newCourseID.trim() || !newCourseName.trim() 
                                    || !newCourseCredithours || !newCourseCategory.trim()}>
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </>
    );
}

export default HODProgram;