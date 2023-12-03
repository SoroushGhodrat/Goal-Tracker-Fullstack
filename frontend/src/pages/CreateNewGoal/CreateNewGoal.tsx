import GoalForm from "../../components/GoalForm/GoalForm";

import styles from "./createNewGoal.module.css";

const CreateNewGoal = () => {
  return (
    <>
      <section className={styles.heading}>
        <p>Make your goal!</p>
      </section>
      <br />
      <GoalForm />
    </>
  );
};

export default CreateNewGoal;
