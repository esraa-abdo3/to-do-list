import { Link } from "react-router-dom";

import React from "react";
export default function Nav (){
    return(
    <nav className="conta" >
            
            <div className="logo">
                to do list
            </div>
            <div className="inside-div" style={{display:"flex", gap:"10px"}}>

            
            <div className="log">
               <Link to="/log" className="logg" style={{textDecoration:"none"}}> sign in</Link>
            </div>
            <div className="log">
               <Link to="/sign"  className="logg"style={{textDecoration:"none"}}> Sign up</Link>
            </div>
            </div>
        </nav>
    )
}