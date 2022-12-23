import { BrowserRouter } from "react-router-dom";
// import Header from './components/Header'
import Main from './components/Main'
// import Footer from './components/Footer'
// import Aside from "./components/Aside";

import './style/normalize.css';
import './style/style.css';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Main/>
      </div>
    </BrowserRouter>
  );
}

export default App;
