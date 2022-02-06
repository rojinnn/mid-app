import axios from "axios";
const baseUrl = "http://167.71.226.245:3005/api";

//get token from local storage

const getHeaders = () => {
  const loginToken = JSON.parse(localStorage.getItem("access-token"));
  return {
    Authorization: `Bearer ${loginToken}`,
  };
};
export const getProducts = () => {
  return axios({
    url: baseUrl + "/products/verified",
    method: "GET",
    Headers: getHeaders(),
  });
};

export const login = (data) => {
  return axios({
    url: baseUrl + "/auth/login",
    method: "POST",
    data,
  });
};
