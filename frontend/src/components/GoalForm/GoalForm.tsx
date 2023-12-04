import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../../features/goals/goalSlice";
import { AppDispatch } from "../../app/store";
import { format } from "date-fns";
import styles from "./goalForm.module.css";
import TextEditor from "../TextEditor/TextEditor";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import useFormValidation from "../../hooks/useFormValidation";
import Error from "../UI/Error/Error";
import { toast } from "react-toastify";

interface Error {
  textError: string | undefined;
  startDateError: string | undefined;
  endDateError: string | undefined;
  isErrored?: boolean;
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

const GoalForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const [text, setText] = useState<string>("");
  const [selectedDates, setSelectedDates] =
    useState<SelectedDates>(initialCalendarState);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Custom hook for form validation hook
  const { errors, setErrors, validateForm } = useFormValidation(
    text,
    selectedDates,
  );

  let startDateFooter = <p>Please select a start date.</p>;
  if (selectedDates.startDate) {
    startDateFooter = (
      <p className={styles.start_date}>
        Start Date: {format(selectedDates.startDate, "PP")}.
      </p>
    );
  }

  let endDateFooter = <p>Please select an end date.</p>;
  if (selectedDates.endDate) {
    endDateFooter = (
      <p className={styles.end_date}>
        End Date: {format(selectedDates.endDate, "PP")}.
      </p>
    );
  }

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const handleStartDateSelect = (date: InputDate) => {
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
      // console.log("Form validation failed: ", errors);
      return;
    } else {
      // console.log("Form validation passed!");
      dispatch(createGoal({ text, selectedDates }));
      toast.success("Goal created successfully");
      handleResetForm();
    }
  };

  const handleResetForm = () => {
    setText("");
    setSelectedDates(initialCalendarState);
    setErrors(initialErrorsState);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
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
          <button
            className={styles.btn_custom}
            type="reset"
            onClick={handleResetForm}
          >
            Reset
          </button>

          <button className={styles.btn_custom} type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
