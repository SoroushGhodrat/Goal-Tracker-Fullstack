import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGoalForm from "./pages/CreateNewGoal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoalList from "./pages/GoalList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/newGoalForm" element={<NewGoalForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/goalList" element={<GoalList />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
