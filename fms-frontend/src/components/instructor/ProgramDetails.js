import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './ProgramDetails.css';
import InstructorSideBar from "./InstructorSideBar";

function ProgramDetails() {
    const { programId } = useParams(); // Get the program ID from the URL
    const [programName, setProgramName] = useState('');
    const [loading, setLoading] = useState(true);
    const [offerings, setOfferings] = useState([]);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <InstructorSideBar />
            <div className='pr-dashboard'>
                <div className='main-heading'>
                    <h1>{programName}</h1>
                </div>
                <hr className="separator" />
                <div className='heading'>
                    <h2>Current Offerings</h2>
                </div>
                <div className='content'>
                <div className='of-tile-list'>
      {offerings.map((offering) => (
        <div className='of-tile-item' key={offering.id}>
          <Link to={`/instructor-programs/offering-details/${offering.id}/${offering.session}`}>
            <div className='of-tile-clr'>{offering.session}</div>
          </Link>
        </div>
      ))}
                </div>
                </div>

            </div>
        </>
    );
}

export default ProgramDetails;