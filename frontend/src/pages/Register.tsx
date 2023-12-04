import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormDataRegister } from "../declarations/formData";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/UI/Spiner/Spiner";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import styles from "./login.module.css";
import signupImage from "../assets/signup.png";

const Register = () => {
  const [formData, setFormData] = useState<FormDataRegister>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { name, email, password, confirm_password } = formData;

  const navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user || user !== null) {
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

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className={styles.heading}>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              autoComplete="username"
              id="name"
              name="name"
              value={name}
              placeholder=""
              onChange={onChange}
            />
          </div>

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
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              autoComplete="new-password"
              id="confirm_password"
              name="confirm_password"
              value={confirm_password}
              placeholder=""
              onChange={onChange}
            />
          </div>

          <div className={styles.form_group}>
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <div className={styles.signup_image}>
          <img src={signupImage} alt="Goal" />
        </div>
      </section>
    </>
  );
};

export default Register;
