import React, { useState, useEffect, useRef } from "react";
import UsersList from "../UsersList/UserListTable";
import { getUsers } from "../../api-request/UserAPI";
import { searchInUsers } from "../../util/SearchUtils";
import { getRecordIndex } from "../../util/PagingUtils";
import config from "../../config";
import Pagination from "../Pagination/Pagination";

// Define the UserManagement component
function UserManagement() {
  // State variables
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const selectAllRef = useRef(null);

  // Fetch users data on component mount
  useEffect(() => {
    getUsers(setUsers);
  }, []);

  console.log("users", users);

  // Function to search users based on input
  const searchUsers = (e) => {
    setPage(1);
    setUsers(searchInUsers(e.target.value, users));
  };

  // Function to delete a user
  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  // Function to edit a user
  const editUser = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  // Function to save user changes
  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  // Function to select/deselect a user
  const selectOne = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  // Function to select/deselect all users
  const selectAll = (e) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .slice(index, index + config.PAGE_SIZE)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };

  // Function to delete selected users
  const deleteSelected = () => {
    setUsers((prevState) => prevState.filter((user) => !user.selected));
    selectAllRef.current.checked = false;
  };

  // Calculate the index of the first record to display on the current page
  const index = getRecordIndex(page);

  // Render the UserManagement component
  return (
    <div className="App">
      {/* Search input */}
      <input
        className="search"
        type="text"
        placeholder="Search by name, email or role"
        onChange={searchUsers}
      ></input>

      {/* UsersList component */}
      <UsersList
        page={page}
        setPage={setPage}
        selectAll={selectAll}
        selectAllRef={selectAllRef}
        selectOne={selectOne}
        saveUser={saveUser}
        editUser={editUser}
        deleteUser={deleteUser}
        users={users
          .filter((user) => user.show)
          .slice(index, index + config.PAGE_SIZE)}
        deleteSelected={deleteSelected}
      ></UsersList>

      {/* Pagination component */}
      <Pagination
        usersLength={users.filter((user) => user.show).length}
        setPage={setPage}
        currentPage={page}
        deleteSelected={deleteSelected}
      />
    </div>
  );
}

export default UserManagement;
