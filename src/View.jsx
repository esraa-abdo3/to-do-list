
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./componet/Sidebar";
import "../src/view.css";
import { Outlet } from "react-router-dom";
import Navbar from "./componet/Navbar";

export default function Viewlog() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/view/tasks");
    }, [navigate]);

    return (
        <>
            <div className="nav-task">
                <Navbar />
            </div>

            <div className="view">
                <div className="side">
                    <Sidebar />
                </div>
                <Outlet />
            </div>
        </>
    );
}
