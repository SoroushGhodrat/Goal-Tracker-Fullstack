import { useState, useEffect } from "react";
import { FormDataLogin } from "../declarations/formData";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/UI/Spiner/Spiner";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import loginImage from "../assets/login.png";
import styles from "./login.module.css";
import Button from "../components/UI/Button/Button";

const Login = () => {
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      toast.error(
        `If you are in development mode, please restart the server. Write 'rs' in the terminal and press enter.`,
      );
    }

    if (isSuccess || user) {
      navigate("/goalList");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: any = {
      email: email,
      password: password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className={styles.heading}>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section style={{ paddingLeft: "20px", textAlign: "center" }}>
        <p>Email: guest@email.com</p>
        <p>Password: password</p>
        <br />
      </section>

      <section className={styles.form}>
        <div className={styles.login_image}>
          <img src={loginImage} alt="Goal" />
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              autoComplete="username"
              id="email"
              name="email"
              value={email}
              placeholder=""
              onChange={onChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              autoComplete="current-password"
              id="password"
              name="password"
              value={password}
              placeholder=""
              onChange={onChange}
            />
          </div>
          <div className={styles.form_group}>
            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
