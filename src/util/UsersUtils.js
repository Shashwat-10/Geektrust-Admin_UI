// Function to process the response data from the API by adding properties to each user object
export const processUsersResponse = (users) => {
  return users.map((user) => {
    user.selected = false;
    user.edit = false;
    user.show = true;
    return user;
  });
};
