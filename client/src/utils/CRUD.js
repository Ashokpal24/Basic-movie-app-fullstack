import { setData } from "../App";
import * as URL from "./urls";
import axios from "axios";

const handleGetData = async ({ setData }) => {
  axios
    .get(URL.getMovieURL)
    .then((data) => {
      setData(data.data.reverse());
    })
    .catch((err) => console.log(err));
};

const handleGetNameFilterData = async ({ filter, setData }) => {
  axios
    .get(URL.getMovieNameURL + filter)
    .then((data) => {
      setData(data.data);
    })
    .catch((err) => console.log(err));
};

const handleSetYear = async ({ year, setData }) => {
  await axios
    .get(URL.getMoviesByYearURL + year)
    .then((data) => {
      setData(data.data);
      // console.log(data)
    })
    .catch((err) => console.log(err));
};

const handleAddData = async ({ newdata, setData }) => {
  await axios
    .post(URL.addMovieURL, newdata)
    .then((data) => {
      handleGetData({ setData });
      console.log(data);
    })
    .catch((err) => console.log(err));
};

const handleUpdateData = async ({ id, updatedData, setData }) => {
  await axios
    .put(URL.updateMovieURL + id, updatedData)
    .then((data) => {
      handleGetData({ setData });
      console.log(data);
    })
    .catch((err) => console.log(err));
};

const handleDelete = async ({ id, setData }) => {
  await axios
    .delete(URL.deleteMovieByIdURL + id)
    .then(() => {
      handleGetData({ setData });
      console.log("movie deleted");
    })
    .catch((err) => console.log(err));
};

export {
  handleGetData,
  handleGetNameFilterData,
  handleSetYear,
  handleAddData,
  handleUpdateData,
  handleDelete,
};
