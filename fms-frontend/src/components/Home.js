import { Link } from "react-router-dom";
import Sidebar from "./user/Sidebar";

function Home() {
  return (
    <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Sidebar/>
        </aside>
        <section className="col-md-9">
        <h3 className = "pb-1">Current Courses</h3>
    <div className="row">
    <div className="col-md-3 mt-3">
    <div className="card">
        <Link to="/course/1"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
            <h5 className="card-title"><Link to="/course/1">Title</Link></h5>
        </div>
    </div>
    </div>
    <div className="col-md-3 mt-3">
    <div className="card">
        <Link to="/"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
            <h5 className="card-title"><Link to="/course/1">Title</Link></h5>
        </div>
    </div>
    </div> 
    <div className="col-md-3 mt-3">
    <div className="card">
        <Link to="/"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
            <h5 className="card-title"><Link to="/course/1">Title</Link></h5>
        </div>
    </div>
    </div> 
    <div className="col-md-3 mt-3">
    <div className="card">
        <Link to="/"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
            <h5 className="card-title"><Link to="/course/1">Title</Link></h5>
        </div>
    </div>
    </div> 
     
    </div>
        </section>
    </div>
</div> 
  ); 
}

export default Home;
