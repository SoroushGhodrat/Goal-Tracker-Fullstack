import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGoal, updateGoal } from "../../features/goals/goalSlice";
import { AppDispatch, RootState } from "../../app/store";
import { format } from "date-fns";
import styles from "./goalForm.module.css";
import TextEditor from "../TextEditor/TextEditor";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import useFormValidation from "../../hooks/useFormValidation";
import Error from "../UI/Error/Error";
import { toast } from "react-toastify";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";

interface Error {
  textError: string | undefined;
  startDateError: string | undefined;
  endDateError: string | undefined;
}

type InputDate = Date | undefined;

interface SelectedDates {
  startDate: InputDate;
  endDate: InputDate;
}
const initialCalendarState: SelectedDates = {
  startDate: undefined,
  endDate: undefined,
};
const initialErrorsState: Error = {
  textError: undefined,
  startDateError: undefined,
  endDateError: undefined,
};

const GoalForm: React.FC = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const goal = useSelector((state: RootState) => state.goals.goals);

  const [VIEW_MODE, setVIEW_MODE] = useState<"create" | "edit">("create");

  const [text, setText] = useState<string>("");

  const [selectedDates, setSelectedDates] =
    useState<SelectedDates>(initialCalendarState);

  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Custom hook for form validation
  const { errors, setErrors, validateForm } = useFormValidation(
    text,
    selectedDates,
  );

  // ===== get goal id from local storage and search for the editable goal
  useEffect(() => {
    const VIEW_MODE = sessionStorage?.getItem("VIE_MODE");
    const goal_id = sessionStorage?.getItem("goal_id");

    const matchedGoal = goal.find((goal) => goal._id === goal_id);

    if (
      matchedGoal &&
      matchedGoal.text &&
      matchedGoal.selectedDates &&
      VIEW_MODE === "edit"
    ) {
      setVIEW_MODE(VIEW_MODE);
      setText(matchedGoal.text);
      if (
        typeof matchedGoal.selectedDates.startDate === "string" &&
        typeof matchedGoal.selectedDates.endDate === "string"
      ) {
        setSelectedDates({
          startDate: new Date(matchedGoal.selectedDates.startDate),
          endDate: new Date(matchedGoal.selectedDates.endDate),
        });
      }
    }
  }, []);

  let startDateFooter = <p>Please select a start date.</p>;
  if (selectedDates.startDate) {
    startDateFooter = (
      <p className={styles.start_date}>
        Start Date: <span>{format(selectedDates.startDate, "PP")}</span> .
      </p>
    );
  }

  let endDateFooter = <p>Please select an end date.</p>;
  if (selectedDates.endDate) {
    endDateFooter = (
      <p className={styles.end_date}>
        End Date: <span> {format(selectedDates.endDate, "PP")}</span>.
      </p>
    );
  }

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const handleStartDateSelect = (date: InputDate) => {
    console.log(date);
    if (date) {
      setSelectedDates({ ...selectedDates, startDate: date });
    }
  };

  const handleEndDateSelect = (date: InputDate) => {
    if (date) {
      setSelectedDates({ ...selectedDates, endDate: date });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    } else {
      dispatch(createGoal({ text, selectedDates }));
      toast.success("Goal created successfully");
      navigate("/goals-list");
      handleResetForm();
    }
  };

  const handleResetForm = () => {
    setText("");
    setSelectedDates(initialCalendarState);
    setErrors(initialErrorsState);
  };

  const handleCancelEditGoal = () => {
    navigate("/goals-list");
    handleResetForm();
    sessionStorage.removeItem("goal_id");
    sessionStorage.removeItem("VIE_MODE");
  };

  const handleUpdateGoal = () => {
    console.log(selectedDates);
    if (!validateForm()) {
      return;
    } else {
      const goal_id = sessionStorage.getItem("goal_id");
      if (goal_id === null) {
        toast.error("Cannot find goal id!");
        return;
      }
      dispatch(
        updateGoal({ goalId: goal_id, goalData: { text, selectedDates } }),
      );
      toast.success("Goal updated successfully!");
      handleResetForm();
      sessionStorage.removeItem("goal_id");
      sessionStorage.removeItem("VIE_MODE");
      navigate("/goals-list");
    }
  };

  return (
    <section className={styles.form}>
      <section className={styles.heading}>
        {VIEW_MODE === "edit" ? (
          <p>Your Goal is ready to edit!</p>
        ) : (
          <p>Add your goal!</p>
        )}
      </section>
      <form onSubmit={onSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="text">Description</label>
          <TextEditor value={text} onChange={handleTextChange} />
        </div>
        {errors.textError && <Error error={errors.textError} />}

        <div className={styles.calendar_container}>
          <div className={styles.calendar_title} onClick={toggleCalendar}>
            <p>Pick Date</p>
            {isCalendarVisible ? <BsChevronUp /> : <BsChevronDown />}
          </div>

          {isCalendarVisible && (
            <div className={styles.calendar}>
              <div className={styles.start_date}>
                <DayPicker
                  mode="single"
                  selected={selectedDates.startDate}
                  onSelect={handleStartDateSelect}
                  footer={startDateFooter}
                />
              </div>
              <div className={styles.end_date}>
                <DayPicker
                  mode="single"
                  selected={selectedDates.endDate}
                  onSelect={handleEndDateSelect}
                  footer={endDateFooter}
                />
              </div>
            </div>
          )}
        </div>
        {errors.startDateError && <Error error={errors.startDateError} />}
        {errors.endDateError && <Error error={errors.endDateError} />}

        <div className={styles.button_group}>
          <Button
            title="Reset"
            variant="button-outline"
            size="medium"
            type="button"
            onClick={handleResetForm}
          />

          {VIEW_MODE === "edit" ? (
            <>
              <Button
                title="Cancel"
                variant="button-outline"
                size="medium"
                type="button"
                onClick={handleCancelEditGoal}
              />
              <Button
                title="Update Goal"
                variant="button-solid"
                size="medium"
                type="button"
                onClick={handleUpdateGoal}
              />
            </>
          ) : (
            <Button
              title="Add Goal"
              type="submit"
              variant="button-solid"
              size="medium"
            />
          )}
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
