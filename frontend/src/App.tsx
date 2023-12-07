import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGoalForm from "./pages/CreateNewGoal/CreateNewGoal";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Header from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoalList from "./pages/GoalList/GoalList";
import Page404 from "./pages/404/Page404";
import GoalForm from "./components/GoalForm/GoalForm";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/new-goal-form" element={<NewGoalForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/goals-list" element={<GoalList />} />
            <Route path="/goalForm" element={<GoalForm />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
