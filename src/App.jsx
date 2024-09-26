import { Route, Routes } from "react-router-dom";
import Log from "./Log";
import Anoymous from "./Anoymousview";
import Sign from "./Sign";
import Viewlog from "./View";
import Tasks from "./Tasks";
import ProtectedRoute from "./ProtectedRoute"; 
import "./view.css";

export default function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Anoymous />} />
   
         <Route 
        path="/log" 
        element={<Log />} 
      />
      <Route 
        path="/sign" 
        element={  <Sign />} 
      />
      <Route 
        path="/view" 
        element={
          <ProtectedRoute>
            <Viewlog />
          </ProtectedRoute>
        }
      >
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}







