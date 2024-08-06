import { useState } from "react";
import "./App.css";

function App() {
  const [phNumber, setPhNumber] = useState("");
  // rgb(37, 211, 102)
  return (
    <div className="App">
      <nav
        style={{ backgroundColor: "rgb(37, 211, 102)" }}
        className="navbar py-2 bg-body-tertiary shadow text-white"
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fw-bold">
            <i class="bi bi-whatsapp"></i> QuickWhatsapp
          </span>
        </div>
      </nav>
      <div className="container">
        <div className="row py-5">
          <div
            style={{ backgroundColor: "rgb(37, 211, 102)" }}
            className="col-7 m-auto pt-5 pb-2 text-center rounded"
          >
            <div className="ms-3 me-3">
              <input
                value={phNumber}
                onChange={(e) => setPhNumber(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter the phone number, you want to chat with..."
              ></input>
            </div>
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://api.whatsapp.com/send/?phone=91${phNumber}&text=Hello&type=phone_number&app_absent=0`}
              className="my-4 btn btn-primary"
            >
              <i class="bi bi-whatsapp"></i> <span>Chat on whatsapp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// https://api.whatsapp.com/send/?phone=91&text&type=phone_number&app_absent=0
