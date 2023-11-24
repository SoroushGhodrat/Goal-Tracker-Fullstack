import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormDataRegister, User } from "../declarations/formData";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spiner";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

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
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user || user !== null) {
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
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder=""
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder=""
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder=""
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              name="confirm_password"
              value={confirm_password}
              placeholder=""
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
