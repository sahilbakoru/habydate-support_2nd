import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputPhone from "./InputPhone";
import "./App.css";
function PhoneButton({ setLogin }) {
  const [isInput, setInputPhone] = useState(false)
  return (
    <>
      <ul className="firebaseui-idp-list">
        <li className="firebaseui-list-item">
          {/* <Link to="/input_phone"> */}
          <button className="btn btn-lg btn-block btn-primary mb-2 gradient-phone-login" onClick={() => setInputPhone(true)}><i className="fas fa-phone-alt" style={{ marginRight: "5px" }}></i>Sign in with Phone</button>

          {/* <button
            className = "firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-phone firebaseui-id-idp-button"
            data-provider-id="phone"
            data-upgraded=",MaterialButton"
          >
            <span className = "firebaseui-idp-icon-wrapper">
              <img
                className = "firebaseui-idp-icon"
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg"
              />
            </span>
            <span className = "firebaseui-idp-text firebaseui-idp-text-long">
              Sign in with phone
            </span>
          </button> */}
          {/* </Link> */}
        </li>
      </ul>
      {isInput ? <InputPhone setInputPhone={setInputPhone} setLogin={setLogin} /> : ""}

    </>
  );
}

export default PhoneButton