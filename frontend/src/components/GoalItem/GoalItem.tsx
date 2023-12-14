import { useDispatch } from "react-redux";
import { deleteGoal } from "../../features/goals/goalSlice";
import { Goal } from "../../declarations/formData";
import { AppDispatch } from "../../app/store";
import styles from "./goalItem.module.css";
import { LuBadgeInfo, LuTrash2, LuPencilLine } from "react-icons/lu";
import "react-quill/dist/quill.snow.css";
import Tooltip from "../UI/Tooltip/Tooltip";
import { dayCalculator } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "../UI/ProgressBar/ProgressBar";

interface GoalItemProps {
  goal: Goal;
  status: "in-progress" | "finished";
}

type InputDate = {
  startDate: Date;
  endDate: Date;
};

const GoalItem = ({ goal, status }: GoalItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { createdAt, _id, text, selectedDates } = goal;
  const { startDate, endDate } = selectedDates as InputDate;

  const {
    _today,
    _startDate,
    _endDate,
    _remainDay,
    _isGoalExpired,
    _isGoalFinishToday,
    _hoursLeft,
  } = dayCalculator(startDate, endDate);

  const navigate = useNavigate();

  const handleEditGoal = (goal_id: string | undefined) => {
    navigate("/goalForm/");
    sessionStorage.setItem("VIE_MODE", "edit");
    sessionStorage.setItem("goal_id", goal_id || "");
  };

  const handleDeleteGoal = (goal_id: string | undefined) => {
    if (!goal_id) {
      toast.error("Cannot fing goal id");
      return;
    }

    dispatch(deleteGoal(goal_id));
    toast.success("Goal deleted successfully");
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
              onClick={() => handleEditGoal(goal._id)}
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
              onClick={() => handleDeleteGoal(goal._id)}
            />
          </Tooltip>
        </div>
      </div>

      {
        <section>
          {status === "in-progress" ? (
            <ProgressBar
              goalStatus={[
                _today,
                _startDate,
                _endDate,
                _remainDay,
                _hoursLeft,
              ]}
            />
          ) : (
            <hr />
          )}
        </section>
      }

      {/* Goal description part */}
      <div
        dangerouslySetInnerHTML={{ __html: text || "" }}
        className={styles.description}
      />
      {/* Goal date information */}

      <section className={styles.duration}>
        {status === "in-progress" ? (
          <>
            <p>Start at: {_startDate}</p>
            <p>Due date: {_endDate}</p>
          </>
        ) : (
          <>
            <p>Start at: {_startDate}</p>
            <p>Due date: {_endDate}</p>
          </>
        )}
      </section>
    </div>
  );
};

export default GoalItem;
