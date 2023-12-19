import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import styles from "./navbar.module.css";
import Button from "../UI/Button/Button";
import DropdownButton from "../DropdownButton/DropdownButton";
import logo from '../../assets/Logo.png'
import { useRef } from "react";

const Navbar = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const navElementRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    const { current: navElement } = navElementRef;
    const { current: hamburgerButton } = hamburgerButtonRef;

    if (navElement && hamburgerButton) {
      const activeClass = styles.active;
      const hamburgerActiveClass = styles.hamburger_active;

      navElement.classList.toggle(activeClass);
      hamburgerButton.classList.toggle(hamburgerActiveClass);
    }
  };

  return (
    <header>
      <nav>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <p>GOAL TRACKER</p>
        </div>

        <ul className={styles.nav_links}>
          {user && (
            <>
              <li>
                <Link to="/goals-list">GOAL LIST</Link>
              </li>
              <li>
                <Link to="/new-goal-form">GREATE A NEW GOAL</Link>
              </li>

              <li>
                <DropdownButton buttonTitle={`Hi ${user.name}!`}>
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
            </>
          )}

          {!user && (
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

        <div
          ref={hamburgerButtonRef}
          className={styles.hamburger}
          onClick={toggleNav}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
      </nav>

      <div ref={navElementRef} className={styles.menubar}>
        {user && (
          <ul>
            <li>
              <Link to="/goals-list">GOAL LIST</Link>
            </li>
            <li>
              <Link to="/new-goal-form">GREATE A NEW GOAL</Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={styles.disabled}
                onClick={(e) => e.preventDefault()}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/setting"
                className={styles.disabled}
                onClick={(e) => e.preventDefault()}
              >
                Setting
              </Link>
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
          </ul>
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
      </div>
    </header>
  );
};

export default Navbar;
