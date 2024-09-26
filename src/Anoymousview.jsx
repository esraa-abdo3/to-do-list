import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../src/An.css"

export default function Anoymous(){
    return(
        <div  >
   <Nav/>
    
        <div className="landing cont">
            <div className="text" style={{textAlign:"center"}}>
                <h1>Organize your work and life, finally</h1>
                <p>Simplify life for both you and your team. The world’s #1 task manager and to-do list app.</p>
             <Link to="/sign"><button> start free</button></Link>   

            </div>

        </div>
        </div>
    )
}