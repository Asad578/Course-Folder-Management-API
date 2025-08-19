import React from "react";
import InstructorSideBar from "./InstructorSideBar";
import InstructorPrograms from "./InstructorPrograms";
import './InstructorDashboard.css'

function InstructorDashboard() {
    
    return (
        <>
            <InstructorSideBar />
            <div className='dashboard'>
                <div className='heading'>
                    <h2>Programs</h2>
                </div>
                <div className='content'>
                    <InstructorPrograms />
                </div>

                
            </div>
        </>
    );
}

export default InstructorDashboard;
