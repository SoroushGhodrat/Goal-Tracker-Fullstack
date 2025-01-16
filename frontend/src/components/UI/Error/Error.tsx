import styles from './error.module.css';

type ErrorProps = {
  error: string;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <div>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

export default Error;
