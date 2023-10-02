import axios from "axios";
import { processUsersResponse } from "../util/UsersUtils";

// The URL of the remote API endpoint
const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

// Function to fetch users from the remote API and process the response
const getUsers = (setUsers) => {
  axios
    .get(API_URL)
    .then((res) => {
      // Set the users data after processing the response
      setUsers(processUsersResponse(res.data));
    })
    .catch((err) => {
      // If there's an error fetching data from the remote API, fall back to local data
      getLocalUsers(setUsers);
    });
};

// Function to fetch users from a local file and process the response
const getLocalUsers = (setUsers) => {
  axios
    .get("./members.json")
    .then((res) => {
      // Set the users data after processing the response
      setUsers(processUsersResponse(res.data));
    })
    .catch((error) => {
      console.error(error);
    });
};

export { getUsers };
