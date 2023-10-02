import PropTypes from "prop-types";
import { useEffect } from "react";
import User from "../UserDetails/UserDetails";
import config from "../../config";
import styles from "./UserListTable.module.css";

// Define the UsersList component
const UsersList = (props) => {
  const {
    users,
    deleteUser,
    editUser,
    saveUser,
    selectAll,
    selectOne,
    selectAllRef,
    setPage,
    page
  } = props;

  // Use useEffect to check if there are no users on the current page and navigate to the previous page
  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);

  // Create empty rows to fill the table to a constant number of rows
  let fillRows = [];
  for (
    let i = users.filter((user) => user.show).length;
    i < config.PAGE_SIZE;
    i++
  ) {
    fillRows.push(<tr key={i}></tr>);
  }

  // Render a message if there are no users on the first page
  if (users.length === 0 && page === 1) {
    return <div>NO USERS IN THE SYSTEM</div>;
  }

  // Render the UsersList component with user data
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                ref={selectAllRef}
                onChange={(e) => {
                  selectAll(e);
                }}
                name="selectAll"
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return user.show ? (
              <User
                selectOne={selectOne}
                saveUser={saveUser}
                editUser={editUser}
                deleteUser={deleteUser}
                key={user.id}
                user={user}
              ></User>
            ) : (
              ""
            );
          })}
          {fillRows}
        </tbody>
      </table>
    </div>
  );
};

// Define PropTypes for the component's props for type checking
UsersList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllRef: PropTypes.object,
  setPage: PropTypes.func,
  page: PropTypes.number
};

export default UsersList;
