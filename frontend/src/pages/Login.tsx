import { useState, useEffect } from "react";
import { FormDataLogin } from "../declarations/formData";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spiner";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const Login = () => {
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
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
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section style={{ paddingLeft: "20px" }}>
        <p>Email: guest@email.com</p>
        <p>Password: password</p>
        <br />
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
