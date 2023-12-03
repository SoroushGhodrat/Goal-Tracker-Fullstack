import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/UI/Spiner/Spiner";
import { getGoals, reset } from "../../features/goals/goalSlice";
import GoalItem from "../../components/GoalItem";
import { Goal } from "../../declarations/formData";
import { AppDispatch } from "../../app/store";
import goalImage from "../../assets/goal.png";
import styles from "./goalList.module.css";
import tabstyles from "./tabs.module.css";

const GoalList = () => {
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
      <section className={styles.heading}>
        <h1>Goals List</h1>
        <div className={styles.img_banner}>
          <img src={goalImage} alt="Goal" />
        </div>
      </section>

      <section>
        <div className={tabstyles.tabs_container}>
          <div className={tabstyles.tab}>
            <label htmlFor="tab_1">Inprogress Goals</label>
            <input
              id="tab_1"
              name="tabs-one"
              type="radio"
              defaultChecked={true}
            />
            <div>
              {goals.map((goal: Goal) => {
                if (goal.selectedDates) {
                  const endDate = new Date(goal.selectedDates.endDate);
                  const today = new Date();

                  if (endDate > today) {
                    return <GoalItem key={goal._id} goal={goal} />;
                  }
                }
                return null;
              })}
            </div>
          </div>
          <div className={tabstyles.tab}>
            <label htmlFor="tab_2">Finished Goals</label>
            <input id="tab_2" name="tabs-one" type="radio" />
            <div>
              {goals.map((goal: Goal) => {
                if (goal.selectedDates) {
                  const endDate = new Date(goal.selectedDates.endDate);
                  const today = new Date();

                  if (endDate < today) {
                    return <GoalItem key={goal._id} goal={goal} />;
                  }
                }
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoalList;
