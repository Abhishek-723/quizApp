import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizHome from './Components/QuizHome';
import Results from './Components/Results';

function App() {
  return (
    <Router>
        <Routes>
                <Route path="/" exact element={<QuizHome />} />
                <Route path="/user/results" element={<Results />} />
        </Routes>
    </Router>
  );
}

export default App;
