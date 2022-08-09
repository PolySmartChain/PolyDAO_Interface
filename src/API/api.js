import axios from "./http";

var get_user_data = function (address, page, limit) {
  return axios.get(
    "/users/get_user_data?address=" +
      address +
      "&page=" +
      page +
      "&limit=" +
      limit
  );
};

export { get_user_data };


