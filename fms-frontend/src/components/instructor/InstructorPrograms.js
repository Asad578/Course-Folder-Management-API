import React, { useEffect, useState } from 'react';
import './InstructorPrograms.css';
import { Link } from 'react-router-dom';

export default function InstructorPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs from backend
  useEffect(() => {
    const role = 'instructor';
    const user_id = 1;
    fetch(`http://127.0.0.1:8000/api/program/?role=${role}&user_id=${user_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPrograms(data); // Assuming the API returns a list of programs
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching programs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (programs.length === 0) {
    return <div>No programs available.</div>;
  }

  return (
    <div className='pr-tile-list'>
      {programs.map((program) => (
        <div className='pr-tile-item' key={program.id}>
          <Link to={`/instructor-programs/${program.id}`}>
            <div className='pr-tile-clr'>{program.name}</div>
          </Link>
        </div>
      ))}

    </div>
  );
}
