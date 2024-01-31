/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from "react";
import styles from "./FlightInfo.module.css";
import FlightDetails from "../FlightDetails";

interface CustomWindow extends Window {
  Android?: {
    triggerExpand: () => void;
    triggerCollapse: () => void;
  };
  handleCollapseFromAndroid?: () => void;
}

interface FlightInfoProps {
  city: string;
  date: string;
  details: Array<{
    title: string;
    subtitle: string;
  }>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlightInfo: React.FC<FlightInfoProps> = ({
  city,
  date,
  details,
  isVisible,
  setIsVisible,
}) => {
  useEffect(() => {
    const windowWithAndroid = window as CustomWindow;
    if (typeof window !== "undefined") {
      if (isVisible) {
        windowWithAndroid.handleCollapseFromAndroid = handleCollapseFromAndroid;
      }
    }
  }, [isVisible]);

  const handleDetailsExpand = () => {
    setIsVisible(true);
    const androidObject = (window as CustomWindow).Android;
    if (typeof window !== "undefined" && androidObject) {
      if (typeof androidObject.triggerExpand === "function") {
        androidObject.triggerExpand();
      } else {
        console.log("androidObject does not have triggerExpand method");
      }
    } else {
      console.log("window.Android is not defined");
    }
  };

  const handleDetailsCollapse = () => {
    setIsVisible(false);
    const androidObject = (window as CustomWindow).Android;
    if (typeof window !== "undefined" && androidObject) {
      androidObject.triggerCollapse();
    } else {
      console.log("window.Android is not defined");
    }
  };

  const handleCollapseFromAndroid = () => {
    console.log("handleCollapseFromAndroid is called");
    setIsVisible(false);
  };

  return (
    <div className={styles.container}>
      <div
        data-testid="title-container"
        onClick={isVisible ? handleDetailsCollapse : handleDetailsExpand}
        className={`${styles.titleContainer} ${
          isVisible ? "" : styles.activeTitle
        }`}
      >
        <h2 className={styles.title}>
          {city},{" "}
          <span style={{ fontWeight: 500, fontSize: "1rem" }}>{date}</span>
        </h2>
      </div>
      <div
        className={`${styles.detailsContainer} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <FlightDetails details={details} />
      </div>
    </div>
  );
};

export default FlightInfo;
