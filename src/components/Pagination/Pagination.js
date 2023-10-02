import { calculateTotalPages } from "../../util/PagingUtils";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

// Define the Pagination component
const Pagination = (props) => {
  // Destructure props
  const { usersLength, setPage, currentPage, deleteSelected } = props;

  // Calculate total number of pages
  const totalPages = calculateTotalPages(usersLength);

  // Function to change the current page
  const changePage = (index) => {
    setPage(index);
  };

  // Function to navigate to a specific page while ensuring it's within bounds
  const navigatePage = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    setPage(index);
  };

  // Initialize an array to hold page components
  let pages = [];

  // Add a "Go to first page" button
  pages.push(
    <div
      key={-3}
      className={`${styles.page} ${currentPage === 1 ? styles.disabled : ""}`}
      onClick={() => changePage(1)}
    >
      <i className="fas fa-angle-double-left"></i>
    </div>
  );

  // Add a "Go to previous page" button
  pages.push(
    <div
      key={-2}
      className={`${styles.page} ${currentPage === 1 ? styles.disabled : ""}`}
      onClick={() => navigatePage(currentPage - 1)}
    >
      <i className="fas fa-angle-left"></i>
    </div>
  );

  // Add numbered pages
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <div
        key={i}
        onClick={() => changePage(i)}
        className={`${styles.page} ${currentPage === i ? styles.selected : ""}`}
      >
        {i}
      </div>
    );
  }

  // Add a "Go to next page" button
  pages.push(
    <div
      key={-1}
      className={`${styles.page} ${
        currentPage === totalPages ? styles.disabled : ""
      }`}
      onClick={() => navigatePage(currentPage + 1)}
    >
      <i className="fas fa-angle-right"></i>
    </div>
  );

  // Add a "Go to last page" button
  pages.push(
    <div
      key={0}
      className={`${styles.page} ${
        currentPage === totalPages ? styles.disabled : ""
      }`}
      onClick={() => changePage(totalPages)}
    >
      <i className="fas fa-angle-double-right"></i>
    </div>
  );

  // Render the Pagination component
  return (
    <div className={styles.paginationContainer}>
      <button className={styles.delete} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
      <div className={styles.pagination}>{pages}</div>
    </div>
  );
};

// Define PropTypes for the component's props for type checking
Pagination.propTypes = {
  usersLength: PropTypes.number,
  setPage: PropTypes.func,
  currentPage: PropTypes.number,
  deleteSelected: PropTypes.func
};

export default Pagination;
