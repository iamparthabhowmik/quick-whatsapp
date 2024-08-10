import React from "react";
import "../../src/App.css";

const HistoryNumber = ({ number, prevNumbers, setPrevNumbers }) => {
  const handleHistory1 = () => {
    let temp = [...prevNumbers];
    temp = temp.filter((ph) => number.split("#")[0] !== ph.split("#")[0]);
    var currentdate = new Date();
    var datetime =
      " ~ " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @" +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes();
    var newPhNum = number.split("#")[0] + "#" + datetime;
    temp = [newPhNum, ...temp];
    setPrevNumbers(temp);
    localStorage.setItem("History", JSON.stringify(temp));
  };
  return (
    <a
      onClick={handleHistory1}
      style={{ textDecoration: "none", color: "black" }}
      className="history-number d-flex justify-content-between"
      data-toggle="tooltip"
      data-placement="top"
      title={`chat with ${number.split("#")[0]}`}
      rel="noreferrer"
      target="_blank"
      href={`https://api.whatsapp.com/send/?phone=${
        number.split("#")[0]
      }&text&type=phone_number&app_absent=0`}
    >
      <div className="fw-semibold ms-2">{number.split("#")[0]}</div>
      <div className="fs-6 fw-light me-2">{number.split("#")[1]}</div>
    </a>
  );
};

export default HistoryNumber;
