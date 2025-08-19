import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to='/home' className="list-group-item list-group-item-action">DashBoard</Link>
                <Link to='/my-courses' className="list-group-item list-group-item-action">My Courses</Link>

            </div>
        </div>
    );
}

export default Sidebar;