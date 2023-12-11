import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/UI/Spiner/Spiner";
import { getGoals, reset } from "../../features/goals/goalSlice";
import GoalItem from "../../components/GoalItem/GoalItem";
import { Goal } from "../../declarations/formData";
import { AppDispatch } from "../../app/store";
import goalImage from "../../assets/goal.png";
import styles from "./goalList.module.css";
import tabstyles from "./tabs.module.css";
import { dayCalculator } from "../../utils/helper";
import PieChart from "../../components/UI/PieChart/PieChart";

const GoalList = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  // const { goals, isLoading, isError, message } = useSelector(
  //   (state: any) => state.goals
  // );
  const goals = useSelector((state: any) => state.goals.goals);

  console.log(goals);

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

  const inProgressGoals = goals.filter((goal: Goal) => {
    let today = new Date();
    let endDate = new Date(goal.selectedDates!.endDate);
    let remainingHours = 0;

    // Check if the end date is today
    if (
      (endDate.getDate() === today.getDate() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getFullYear() === today.getFullYear()) ||
      today.getTime() <= endDate.getTime()
    ) {
      // Calculate remaining hours
      remainingHours = today.getHours() - endDate.getHours();

      if (remainingHours > 0) {
        return true;
      }
    }
    return false;
  });

  const finishedGoals = goals.filter(
    (goal: Goal) =>
      goal.selectedDates &&
      new Date(goal.selectedDates.endDate) < new Date() &&
      !inProgressGoals.includes(goal),
  );

  return (
    <>
      <section className={styles.heading}>
        <p>Goals List</p>
        <div className={styles.img_banner}>
          <img src={goalImage} alt="Goal" />
        </div>
      </section>

      <section>
        {/* In Progress Goals Tab*/}
        <div className={tabstyles.tabs_container}>
          <div className={tabstyles.tab}>
            <label htmlFor="tab_1">In Progress Goals</label>
            <input
              id="tab_1"
              name="tabs-one"
              type="radio"
              defaultChecked={true}
            />
            <div>
              {inProgressGoals.length > 0 ? (
                inProgressGoals.map((goal: Goal) => {
                  return <GoalItem key={goal._id} goal={goal} status={'in-progress'}/>;
                })
              ) : (
                <p>You don't have any in progress goals yet!</p>
              )}
            </div>
          </div>
          {/* Finished Goals Tab*/}
          <div className={tabstyles.tab}>
            <label htmlFor="tab_2">Finished Goals</label>
            <input id="tab_2" name="tabs-one" type="radio" />
            <div>
              {finishedGoals.length > 0 ? (
                finishedGoals.map((goal: Goal) => {
                  return <GoalItem key={goal._id} goal={goal} status={'finished'}/>;
                })
              ) : (
                <p>You don't have any finished goals yet!</p>
              )}
            </div>
          </div>
          {/* Chart Tab */}
          <div className={tabstyles.tab}>
            <label htmlFor="tab_3">Goals Chart</label>
            <input id="tab_3" name="tabs-one" type="radio" />
            <div>
              {goals.length > 0 ? (
                <PieChart
                  inProgressGoals={inProgressGoals}
                  finishedGoals={finishedGoals}
                />
              ) : (
                "You don't have any goals yet!"
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoalList;
