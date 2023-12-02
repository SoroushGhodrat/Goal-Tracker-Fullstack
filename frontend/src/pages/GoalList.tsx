import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalFrom from "../components/GoalForm/GoalForm";
import Spinner from "../components/UI/Spiner/Spiner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
import { Goal } from "../declarations/formData";
import { AppDispatch } from "../app/store";
import goalImage from "../assets/goal.png";
function NewGoalForm() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  // const { goals, isLoading, isError, message } = useSelector(
  //   (state: any) => state.goals
  // );
  const goals = useSelector((state: any) => state.goals.goals);

  useEffect(() => {
    if (goals.isError) {
      console.log(goals.message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, goals.isError, goals.message, dispatch]);

  if (goals && goals.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Goals List</h1>
        {/* <div >
          <img src={goalImage} alt="Goal" />
        </div> */}
      </section>

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal: Goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <p>You have not set any goals</p>
        )}
      </section>
    </>
  );
}

export default NewGoalForm;
