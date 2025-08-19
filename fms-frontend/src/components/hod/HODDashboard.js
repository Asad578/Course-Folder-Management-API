import React from "react";
import HODSideBar from "./HODSideBar";
import Programs from "./Programs";
import './HODDashboard.css';

function HODDashboard() {

    return (
        <>
            <HODSideBar />
            <div className='dashboard'>
                <div className='heading'>
                    <h2>Programs</h2>
                </div>
                <div className='content'>
                    <Programs />
                </div>
            </div>
        </>
    );
}

export default HODDashboard;
