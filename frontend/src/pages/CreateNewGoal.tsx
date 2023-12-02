import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm/GoalForm";
import Spinner from "../components/UI/Spiner/Spiner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
import { Goal } from "../declarations/formData";
import { AppDispatch } from "../app/store";

const CreateNewGoal = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  // const { goals, isLoading, isError, message } = useSelector(
  //   (state: any) => state.goals
  // );
  const goals = useSelector((state: any) => state.goals.goals);

  // useEffect(() => {
  //   if (goals.isError) {
  //     console.log(goals.message);
  //   }

  //   if (!user) {
  //     navigate("/login");
  //   }

  //   dispatch(getGoals());

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [user, navigate, goals.isError, goals.message, dispatch]);

  // if (goals && goals.isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="heading">
        <p>Make your goal!</p>
      </section>
      <br />
      <GoalForm />
    </>
  );
};

export default CreateNewGoal;
