import { useEffect, useState } from "react";
import "./App.css";
import HistoryNumber from "./component/HistoryNumber.jsx";

function App() {
  const [phNumber, setPhNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [prevNumbers, setPrevNumbers] = useState(
    JSON.parse(localStorage.getItem("History")) || []
  );
  const isValidNumber = () => {
    if (phNumber.length !== 10) {
      setBtnDisabled(true);
      return;
    }
    if (countryCode.length === 0 || countryCode.length > 3) {
      setBtnDisabled(true);
      return;
    }
    for (let i = 0; i < phNumber.length; i++) {
      if (isNaN(parseInt(phNumber[i]))) {
        setBtnDisabled(true);
        return;
      }
    }
    for (let i = 0; i < countryCode.length; i++) {
      if (isNaN(parseInt(countryCode[i]))) {
        setBtnDisabled(true);
        return;
      }
    }
    setBtnDisabled(false);
  };
  useEffect(() => {
    isValidNumber();
  }, [phNumber, countryCode]);

  const handleHistory = () => {
    let temp = [...prevNumbers];
    temp = temp.filter((ph) => countryCode + phNumber !== ph.split("#")[0]);
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
    var newPhNum = countryCode + phNumber + "#" + datetime;
    temp = [newPhNum, ...temp];
    setPrevNumbers(temp);
    localStorage.setItem("History", JSON.stringify(temp));
  };

  // rgb(37, 211, 102)
  return (
    <div className="App">
      <nav
        style={{ backgroundColor: "rgb(37, 211, 102)" }}
        className="navbar py-2 bg-body-tertiary shadow text-white"
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fw-bold">
            <i className="bi bi-whatsapp"></i> QuickWhatsapp
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row py-5">
          <div className="col-6 m-auto pt-5 pb-2 text-center">
            <div
              style={{ backgroundColor: "rgb(37, 211, 102)" }}
              className="rounded"
            >
              <div className="ms-3 me-3 pt-5">
                <div className="row mx-2">
                  <div className="col-md-3">
                    <input
                      value={countryCode}
                      onChange={(e) => {
                        setCountryCode(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Country code"
                    ></input>
                  </div>
                  <div className="col-md-9">
                    <input
                      value={phNumber}
                      onChange={(e) => {
                        setPhNumber(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Enter the phone number, you want to chat with..."
                    ></input>
                  </div>
                </div>
              </div>
              <div className="pb-3 mt-2">
                <a
                  onClick={handleHistory}
                  rel="noreferrer"
                  target="_blank"
                  href={`https://api.whatsapp.com/send/?phone=${
                    countryCode + phNumber
                  }&text&type=phone_number&app_absent=0`}
                  className={`my-4 btn btn-primary px-md-5 ${
                    btnDisabled ? "disabled" : ""
                  }`}
                >
                  <i className="bi bi-whatsapp"></i>{" "}
                  <span>Chat on whatsapp</span>
                </a>
              </div>
            </div>

            <div
              style={{ backgroundColor: "rgb(37, 211, 102)" }}
              className="rounded mt-4"
            >
              {prevNumbers.length >= 1 ? (
                <h4 className="pt-3 pb-2">History</h4>
              ) : (
                <></>
              )}
              {prevNumbers?.map((curr) => (
                // component
                <HistoryNumber
                  key={curr}
                  number={curr}
                  handleHistory={handleHistory}
                  prevNumbers={prevNumbers}
                  setPrevNumbers={setPrevNumbers}
                />
              ))}
              {prevNumbers.length >= 1 ? <div className="py-2"></div> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// https://api.whatsapp.com/send/?phone=91&text&type=phone_number&app_absent=0
