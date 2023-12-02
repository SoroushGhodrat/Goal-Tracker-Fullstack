import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import styles from "./navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/register");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>GOAL TRACKER</div>

      <ul>
        {user ? (
          <>
            <li>
              <Link to="/goalList">GOAL LIST</Link>
            </li>
            <li>
              <Link to="/newGoalForm">GREATE A NEW GOAL</Link>
            </li>

            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> LOGOUT
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> LOGIN
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> REGISTER
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
