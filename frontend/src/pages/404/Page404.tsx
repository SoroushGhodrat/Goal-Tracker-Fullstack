import styles from "./page404.module.css";
import Page404_img from "../../assets/page_not_found.png";

const Page404 = () => {
  return (
    <div className={styles.page_not_found}>
      <img src={Page404_img} alt="Page not found" />
      <h1>Something's wrong here.</h1>
      <p>
        This is a 404 error, which means you've clicked on a bad link or entered
        an invalid URL.
      </p>
    </div>
  );
};

export default Page404;
