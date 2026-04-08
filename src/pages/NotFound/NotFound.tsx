import React from "react";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className={styles.notFoundPageContainer}>
        <h1> Page Not Found</h1>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </>
  );
};

export default NotFoundPage;
