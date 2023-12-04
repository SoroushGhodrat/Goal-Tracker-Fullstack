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
import { dayCalculator } from "../../utils/dateStandardizer";

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

  const inProgressGoals = goals.filter(
    (goal: Goal) =>
      goal.selectedDates && new Date(goal.selectedDates.endDate) > new Date(),
  );

  const finishedGoals = goals.filter(
    (goal: Goal) =>
      goal.selectedDates && new Date(goal.selectedDates.endDate) < new Date(),
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
                goals.map((goal: Goal) => {
                  if (goal.selectedDates) {
                    const { _today, _endDate, _isGoalFinishToday } =
                      dayCalculator(
                        goal.selectedDates.startDate,
                        goal.selectedDates.endDate,
                      );

                    if (
                      new Date(_endDate) > new Date(_today) ||
                      _isGoalFinishToday
                    ) {
                      return <GoalItem key={goal._id} goal={goal} />;
                    }
                  }
                  return null;
                })
              ) : (
                <p>You don't have any in progress goals yet!</p>
              )}
            </div>
          </div>
          <div className={tabstyles.tab}>
            <label htmlFor="tab_2">Finished Goals</label>
            <input id="tab_2" name="tabs-one" type="radio" />
            <div>
              {finishedGoals.length > 0 ? (
                goals.map((goal: Goal) => {
                  if (goal.selectedDates) {
                    const { _isGoalExpired, _hoursLeft } = dayCalculator(
                      goal.selectedDates.startDate,
                      goal.selectedDates.endDate,
                    );

                    if (!_isGoalExpired && !_hoursLeft) {
                      return <GoalItem key={goal._id} goal={goal} />;
                    }
                  }
                  return null;
                })
              ) : (
                <p>You don't have any finished goals yet!</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoalList;
