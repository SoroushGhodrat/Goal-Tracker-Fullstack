import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import styles from "./navbar.module.css";
import Button from "../UI/Button/Button";

const Navbar = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>GOAL TRACKER</div>

      <ul>
        {user ? (
          <>
            <li>
              <Link to="/goals-list">GOAL LIST</Link>
            </li>
            <li>
              <Link to="/new-goal-form">GREATE A NEW GOAL</Link>
            </li>

            <li>
              <Button
                variant="contained"
                size="medium"
                type="button"
                onClick={onLogout}
              >
                <FaSignOutAlt />
                &nbsp;&nbsp;LOGOUT
              </Button>
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
