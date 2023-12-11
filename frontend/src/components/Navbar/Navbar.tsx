import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import styles from "./navbar.module.css";
import Button from "../UI/Button/Button";
import DropdownButton from "../DropdownButton/DropdownButton";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
        GOAL TRACKER
      </div>

      <div>
        {user && (
          <>
            <div>
              <ul>
                <li>
                  <Link to="/goals-list">GOAL LIST</Link>
                </li>
                <li>
                  <Link to="/new-goal-form">GREATE A NEW GOAL</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {user && (
        <div>
          <ul>
            <li>
              <DropdownButton buttonTitle="hi guest!">
                <li>
                  <Button
                    title="Profile"
                    size="medium"
                    type="button"
                    variant="button-text"
                    disabled
                  />
                </li>
                <li>
                  {" "}
                  <Button
                    title="Setting"
                    size="medium"
                    type="button"
                    variant="button-text"
                    disabled
                  />
                </li>
                <li>
                  <Button
                    title="Logout"
                    variant="button-text"
                    size="medium"
                    type="button"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt />
                    &nbsp;&nbsp;
                  </Button>
                </li>
              </DropdownButton>
            </li>
          </ul>
        </div>
      )}

      {!user && (
        <ul>
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
        </ul>
      )}
    </header>
  );
};

export default Navbar;
