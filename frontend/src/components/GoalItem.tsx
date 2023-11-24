import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { Goal } from "../declarations/formData";
import { AppDispatch } from "../app/store";

interface GoalItemProps {
  goal: Goal;
}

const GoalItem = ({ goal }: GoalItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { createdAt, _id, text } = goal;

  return (
    <div className="goal">
      <div>
        Created at:
        {createdAt ? new Date(createdAt).toLocaleString("en-US") : ""}
      </div>
      <h2>{text}</h2>
      <button
        onClick={() => _id && dispatch(deleteGoal(_id))}
        className="close"
      >
        X
      </button>
    </div>
  );
};

export default GoalItem;
