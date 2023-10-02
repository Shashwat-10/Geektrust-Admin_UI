import config from "../config";

// Function to calculate the total number of pages based on the total number of records
export const calculateTotalPages = (length) => {
  return Math.ceil(length / 10);
};

// Function to calculate the index of the first record to display on a given page
export const getRecordIndex = (page) => {
  return (page - 1) * config.PAGE_SIZE;
};
