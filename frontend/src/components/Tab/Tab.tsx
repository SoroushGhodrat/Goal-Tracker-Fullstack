import styles from "./tabs.module.css";
import React, { FC, ReactElement, ReactNode } from "react";

interface TabProps {
  firstTabTitle: string;
  secondTabTitle: string;
  firstTabChildren: ReactElement;
  secondTabChildren: ReactNode;
}

const Tab: FC<TabProps> = ({
  firstTabTitle,
  secondTabTitle,
  firstTabChildren,
  secondTabChildren,
}) => {
  return (
    <div className={styles.tabs_container}>
      <div className={styles.tab}>
        <label htmlFor="tab_1">{firstTabTitle}</label>
        <input id="tab_1" name="tabs-one" type="radio" checked={true} />
        {/* <div>
            <h4>Tab One</h4>
            <p>
              Lorem ipsulum. Nit eu, aliquet somentum nisrem. Suspendisse
              consectetur volutpat est ut ornare.
            </p>
          </div> */}
        {firstTabChildren}
      </div>
      <div className={styles.tab}>
        <label htmlFor="tab_2">{secondTabTitle}</label>
        <input id="tab_2" name="tabs-one" type="radio" />
        {/* <div>
            <h4>Tab Two</h4>
            <p>
              Quisque sit ams. Aentum nisi enim, scelerisque faucibus lectus
              sodales at.
            </p>
          </div> */}
        {secondTabChildren}
      </div>
    </div>
  );
};

export default Tab;
