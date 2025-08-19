
function FacultyLogin(){
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h4 className="card-header"> Faculty Login</h4>
                        <div className="card-body">
                        
                            <form className="px-4 py-3">
                                <div className="form-group">
                                <label for="exampleDropdownFormEmail1">Sap id</label>
                                <input type="text" className="form-control" id="exampleDropdownFormEmail1" placeholder="eg: 123"/>
                                </div>
                                <div className="form-group">
                                <label for="exampleDropdownFormPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
                                </div>
                               
                                <button type="submit" className="btn btn-primary">Log in</button>
                            </form>
                            
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FacultyLogin;