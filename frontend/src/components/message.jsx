import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mesaage = ({ children }) => {
  toast.error(children);
  return <ToastContainer></ToastContainer>;
};

export default Mesaage;
