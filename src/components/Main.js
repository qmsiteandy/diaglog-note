import React from "react";
import { Route, Routes } from "react-router-dom";
import RecordScreen from "../screens/recordScreen";

const Main = () => {
   return (
     <main className="main">
       <div className="content">
         <Routes>
           <Route path="/" element={<RecordScreen />}/>
         </Routes>
       </div>
     </main>
   );
}

export default Main;