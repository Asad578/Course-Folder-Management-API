import { useParams } from "react-router-dom";
import Sidebar from "./user/Sidebar";

function CourseDetail(){
    let {course_id}=useParams();
    return(
        <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <Sidebar/>
            </aside>
            <section className="col-md-9">
            <h2>Course {course_id} </h2>
            </section>
        </div>
        </div>
    );
}

export default CourseDetail;