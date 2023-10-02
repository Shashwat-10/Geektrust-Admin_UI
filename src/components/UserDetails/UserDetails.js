import { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./UserDetails.module.css";

// Define the User component
const User = (props) => {
  // Destructure props
  const { user, deleteUser, editUser, saveUser, selectOne } = props;

  // Create refs for input elements
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    // Create a table row for the user
    <tr key={user.id} className={user.selected ? styles.selected : ""}>
      <td>
        {/* Checkbox for selecting the user */}
        <label htmlFor={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            data={`${user.selected}`}
            onChange={() => selectOne(user.id)}
            checked={user.selected}
          ></input>
        </label>
      </td>
      <td>
        {/* Input field for the user's name */}
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </td>
      <td>
        {/* Input field for the user's email */}
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        {/* Input field for the user's role */}
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={styles.icons}>
        {/* Render edit or save icon based on user's edit mode */}
        {user.edit ? (
          <i
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
            className={`fas fa-save ${styles.saveicon}`}
          ></i>
        ) : (
          <i
            onClick={() => editUser(user.id)}
            className={`fas fa-edit ${styles.editicon}`}
          ></i>
        )}

        {/* Render delete icon */}
        <i
          onClick={() => deleteUser(user.id)}
          className={`fa-solid fa-trash ${styles.deleteicon}`}
        ></i>
      </td>
    </tr>
  );
};

// Define PropTypes for the component's props for type checking
User.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectOne: PropTypes.func
};

export default User;
