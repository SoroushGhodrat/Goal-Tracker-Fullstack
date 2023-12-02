import styles from "./goalCard.module.css";

import { deleteGoal } from "../../features/goals/goalSlice";

import { LuBadgeInfo, LuTrash2, LuPencilLine } from "react-icons/lu";
import "react-quill/dist/quill.snow.css";
import Tooltip from "../UI/Tooltip/Tooltip";
import { dateStandardizer, goalDuration } from "../../utils/dateStandardizer";
import { Goal } from "../../declarations/formData";

import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
interface GoalItemProps {
  goal: Goal;
}

type InputDate = {
  startDate: Date;
  endDate: Date;
};

const GoalCard = ({ goal }: GoalItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { createdAt, _id, text, selectedDates } = goal;
  const { startDate, endDate } = selectedDates as InputDate;
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
              Created at:
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
        <p>Start at: {dateStandardizer(startDate)}</p>
        <p>Due date: {dateStandardizer(endDate)}</p>
        <p>Remain day(s) {goalDuration(startDate, endDate)}</p>
      </section>
    </div>
  );
};

export default GoalCard;
