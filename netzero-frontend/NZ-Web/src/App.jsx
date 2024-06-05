
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./assets/pages/Dashboard";
import Auth from "./assets/pages/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
