import { useDispatch } from "react-redux";
import { deleteGoal } from "../../features/goals/goalSlice";
import { Goal } from "../../declarations/formData";
import { AppDispatch } from "../../app/store";
import styles from "./goalItem.module.css";
import { LuBadgeInfo, LuTrash2, LuPencilLine } from "react-icons/lu";
import "react-quill/dist/quill.snow.css";
import Tooltip from "../UI/Tooltip/Tooltip";
import { dayCalculator } from "../../utils/helper";

interface GoalItemProps {
  goal: Goal;
}

type InputDate = {
  startDate: Date;
  endDate: Date;
};

const GoalItem = ({ goal }: GoalItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { createdAt, _id, text, selectedDates } = goal;
  const { startDate, endDate } = selectedDates as InputDate;

  const {
    _startDate,
    _endDate,
    _remainDay,
    _isGoalExpired,
    _isGoalFinishToday,
    _hoursLeft,
  } = dayCalculator(startDate, endDate);

  const handleEditGoal = () => {
    alert("Not implemented yet");
  };

  return (
    <div className={styles.goal}>
      <div className={styles.goal_action_container}>
        <div className={styles.info}>
          <LuBadgeInfo size={20} color="#3a73a9" />

          <div>
            <p>
              Created at:&nbsp;
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </p>
          </div>
        </div>
        <div className={styles.goal_actions}>
          <Tooltip
            title="Edit this goal"
            textColor="green"
            backgroundColor="#EFE1CE"
          >
            <LuPencilLine
              size={30}
              className={styles.edit_icon}
              onClick={handleEditGoal}
            />
          </Tooltip>

          <Tooltip
            title="Delete this goal"
            textColor="red"
            backgroundColor="#EFE1CE"
          >
            <LuTrash2
              size={20}
              className={styles.delete_icon}
              onClick={() => _id && dispatch(deleteGoal(_id))}
            />
          </Tooltip>
        </div>
      </div>
      <hr />

      <div
        dangerouslySetInnerHTML={{ __html: text || "" }}
        className={styles.description}
      />

      <section className={styles.duration}>
        <p>Start at: {_startDate}</p>
        <p>Due date: {_endDate}</p>
        {_isGoalExpired ? (
          <p>
            {_remainDay} day{_remainDay > 1 ? "s" : ""} left
          </p>
        ) : null}
        {_isGoalFinishToday && <p>{_hoursLeft} hours left</p>}
      </section>
    </div>
  );
};

export default GoalItem;
