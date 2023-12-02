import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { Goal } from "../declarations/formData";
import { AppDispatch } from "../app/store";
import styles from "./goalItem.module.css";
import { LuBadgeInfo, LuTrash2, LuPencilLine } from "react-icons/lu";
import "react-quill/dist/quill.snow.css";
import Tooltip from "./UI/Tooltip/Tooltip";
import { dateStandardizer, goalDuration } from "../utils/dateStandardizer";
import GoalCard from "./GoalCard/GoalCard";
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

  const handleEditGoal = () => {
    alert("Not implemented yet");
  };

  return (
    <>
      <GoalCard goal={goal} />
    </>
  );
};

export default GoalItem;
