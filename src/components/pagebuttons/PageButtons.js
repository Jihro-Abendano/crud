import React from "react";
import { Button } from "reactstrap";
import styles from "./PageButtons.module.scss";

const PageButtons = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className={styles["post-pages"]}>
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={styles["post-pages-prev"]}
      >
        Previous
      </Button>

      <Button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={styles["post-pages-next"]}
      >
        Next
      </Button>
    </div>
  );
};

export default PageButtons;
