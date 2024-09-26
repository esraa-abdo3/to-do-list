import React from "react";

import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../An.css"

export default function Navbar() {


  const handleLogout = () => {
    localStorage.removeItem('uid');
   
  };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
        

<Link className="navbar-brand" to="" >To Do List</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className=" navbar-nav me-auto mb-2 mb-lg-0" >
    
                        <li className="nav-item" style={{fontSize:"17px"}}>
                            <Link  to="/" className="nav-link" onClick={handleLogout}>Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

