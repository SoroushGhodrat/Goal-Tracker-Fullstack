import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { AppDispatch } from "../app/store";
import { format } from "date-fns";
import styles from "./goalForm.module.css";
import TextEditor from "./TextEditor/TextEditor";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type CalendarDate = Date | undefined;
interface calendar {
  startDate: CalendarDate;
  endDate: CalendarDate;
}

const initialCalendarDate: calendar = {
  startDate: undefined,
  endDate: undefined,
};

const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createGoal({ text }));

    setText("");
  };

  const [selectedDates, setSelectedDates] =
    useState<calendar>(initialCalendarDate);

  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  let startDateFooter = <p>Peak a start date!</p>;
  if (selectedDates.startDate) {
    startDateFooter = (
      <p className={styles.start_date}>
        Start Date: {format(selectedDates.startDate, "PP")}.
      </p>
    );
  }

  let endDateFooter = <p>Peak a due date!</p>;
  if (selectedDates.endDate) {
    endDateFooter = (
      <p className={styles.end_date}>
        End Date: {format(selectedDates.endDate, "PP")}.
      </p>
    );
  }

  const handleStartDateSelect = (date: CalendarDate) => {
    if (date) {
      setSelectedDates({ ...selectedDates, startDate: date });
    }
  };

  const handleEndDateSelect = (date: CalendarDate) => {
    if (date) {
      setSelectedDates({ ...selectedDates, endDate: date });
    }
  };

  const handleWipeForm = () => {
    setText("");
    setSelectedDates(initialCalendarDate);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Description</label>
          <TextEditor value={text} onChange={setText} />
        </div>

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

        <div className={styles.button_group}>
          <button
            className={styles.btn_custom}
            type="reset"
            onClick={handleWipeForm}
          >
            Wipe Form
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
