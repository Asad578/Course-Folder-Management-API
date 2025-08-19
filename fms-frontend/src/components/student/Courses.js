import React from 'react'
import './Courses.css';
import { Link } from 'react-router-dom';

const Courses = () => {

    let courseItems = [];

    courseItems = (
        <>
            <div className="course-item">
                <Link to='/allfoldertiles'><div className='course-clr'>PF</div></Link>
                <div className='course-dtl'>
                    <Link to='/allfoldertiles'><h4>Programming Fundamentals</h4></Link>
                    <p>4 Credits | Spring 2024</p>
                    <div className='progress-con'>
                        <div className='progress-per'>20% completed</div>
                        <div className='progress-bar'>
                            <div className='progress-bar-fill'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="course-item">
                <Link to='/allfoldertiles'><div className='course-clr'>DS</div></Link>
                <div className='course-dtl'>
                    <Link to='/allfoldertiles'><h4>Discrete Structure</h4></Link>
                    <p>4 Credits | Spring 2024</p>
                    <div className='progress-con'>
                        <div className='progress-per'>20% completed</div>
                        <div className='progress-bar'>
                            <div className='progress-bar-fill'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="course-item">
                <Link to='/allfoldertiles'><div className='course-clr'>DC</div></Link>
                <div className='course-dtl'>
                    <Link to='/allfoldertiles'><h4>Distributed Computing</h4></Link>
                    <p>4 Credits | Spring 2024</p>
                    <div className='progress-con'>
                        <div className='progress-per'>20% completed</div>
                        <div className='progress-bar'>
                            <div className='progress-bar-fill'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="course-item">
                <Link to='/allfoldertiles'><div className='course-clr'>OOP</div></Link>
                <div className='course-dtl'>
                    <Link to='/allfoldertiles'><h4>Object Oriented Programming</h4></Link>
                    <p>4 Credits | Spring 2024</p>
                    <div className='progress-con'>
                        <div className='progress-per'>20% completed</div>
                        <div className='progress-bar'>
                            <div className='progress-bar-fill'></div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );

    return (
        <>
        <div className='course-list'>
            {courseItems}
        </div>
        
        </>
    );
};

export default Courses;
