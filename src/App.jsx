import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Search from "./components/Search";
import Home from "./components/Home";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
