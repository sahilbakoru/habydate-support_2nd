import React, { Component } from "react";
import firebase from "firebase/app";
import { connect, useDispatch } from 'react-redux';
import userActions from "../../redux/user/actions";
import { checkUniqueUserOrCreate } from "../../services/FirebaseServices"
import { toast } from "react-toastify";
import ReactFlagsSelect from 'react-flags-select';
import countryCode from '../../utils/countryCode.json'
import CreateUser from "../../pages/CreateUser";
import "./App.css";
import "firebase/auth";

const { userLogin, userLoinSuccess, userLoinError, userSetBasic, userUnsetNewUser } = userActions

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendOTP: false,
      phone_number: "",
      currentUser: null,
      otp: "",
      isButtonDisabled: true,
      countryCodeOptions: [
        {
          countryCode: 'IN',
          callingCode: '+91',
          phone_number: '',
          visibleCountryCode: false,
        }
      ],
      setLogin: false,
      callingCode: '+1',
      countryCode: 'US',
      isNewUser: false
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(this.props.firebaseConfig);
    }
  }

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: response => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          this.setState({ isButtonDisabled: false });
        },
        "expired-callback": response => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          this.setState({ isButtonDisabled: true });
          alert("Recaptcha Exprie Please try agian");
        }
      }
    );
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }

  handlePhoneChange = event => {
    this.setState({ phone_number: event.target.value });
  };
  handleOTPChange = event => {
    this.setState({ otp: event.target.value });
  };

  handleSelectCode = code => {
    const tempRes = this.renderCountry()
    // console.log('.......code', tempRes[code]);
    this.setState({ callingCode: tempRes[code].secondary })
    this.setState({ countryCode: code })
  }
  handleLogin = () => {
    const { phone_number, callingCode } = this.state;
    var appVerifier = window.recaptchaVerifier;
    const phoneNo = `${callingCode}${phone_number}`
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNo, appVerifier)
      .then(confirmationResult => {
        this.setState({ sendOTP: true });
        window.confirmationResult = confirmationResult;
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleOTPCheck = () => {
    const { userLogin, userLoinError, userLoinSuccess, setLogin, userSetBasic } = this.props;
    window.confirmationResult
      .confirm(this.state.otp)
      .then(async function (result) {
        // User signed in successfully.
        userLogin()
        var res = await checkUniqueUserOrCreate(result.user);
        if (res.error === false) {
          userLoinSuccess(res.user)
          localStorage.setItem('user', JSON.stringify(res.user[0]))
          toast(res.msg)
          setLogin(true)
          this.state.setLogin(true);
        } else {
          // const providerData = res.user.providerData[0];
          const basicUser = {
            email: "",
            name: "",
            socialType: 'phone',
            profilePic: "",
            uid: res.user.uid
          }

          userSetBasic(basicUser);
          // this.state.setLogin(true);
          userLoinError();
        }
        // ...
      })
      .catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
        userLoinError()
        // toast(error.message)
        // console.log("opt check error", error);
      });
  };
  handleSubmit(event) {

    event.preventDefault();
  }

  renderCountry = () => {
    let tempRes = {}
    countryCode.map(item => {
      tempRes[item.code] = { secondary: item.dial_code }
    })
    return tempRes;
  }
  render() {
    const { countryCodeOptions, isNewUser } = this.state
    const { setInputPhone, user } = this.props;
    if (this.state.sendOTP === false) {
      return (
        <div className="firebaseui-spa">
          <div id="firebaseui-contianer">
            <div className="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start">
              <form onSubmit={this.handleSubmit}>
                <div className="firebaseui-card-header">
                  <h1 className="firebaseui-title">Enter your phone number</h1>
                </div>
                <div className="firebaseui-card-content">
                  <div className="firebaseui-relative-wrapper">
                    <div className="firebaseui-phone-number">
                      {/* <button
                        className ="firebaseui-id-country-selector firebaseui-country-selector mdl-button mdl-js-button"
                        data-upgraded=",MaterialButton"
                      >
                        {countryCodeOptions.map(item => {
                          return (
                            <>
                              <span className ={`firebaseui-flag firebaseui-country-selector-flag firebaseui-id-country-selector-flag firebaseui-flag-${item.countryCode}`} />
                              <span className ="firebaseui-id-country-selector-code">
                                &lrm;{item.callingCode}
                              </span>
                            </>
                          )
                        })}

                      </button> */}
                      <ReactFlagsSelect
                        selected={this.state.countryCode}
                        customLabels={this.renderCountry()}
                        onSelect={code => this.handleSelectCode(code)}
                        className="countrySelect"
                        searchable={true}
                        selectedSize={15}
                      />
                      <div
                        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label firebaseui-textfield firebaseui-phone-input-wrapper is-upgraded"
                        data-upgraded=",MaterialTextfield"
                      >
                        <input
                          value={this.state.phone_number}
                          onChange={this.handlePhoneChange}
                          placeholder="Phone Number"
                          type="tel"
                          name="phoneNumber"
                          className="mdl-textfield__input firebaseui-input firebaseui-id-phone-number"
                        />
                      </div>
                    </div>
                    <div className="firebaseui-error-wrapper">
                      <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-phone-number-error firebaseui-id-phone-number-error" />
                    </div>
                    <div id="recaptcha-container" />
                    <div className="firebaseui-recaptcha-wrapper">
                      <div className="firebaseui-recaptcha-container" />

                      <div className="firebaseui-error-wrapper firebaseui-recaptcha-error-wrapper">
                        <p className="firebaseui-error firebaseui-hidden firebaseui-id-recaptcha-error" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="firebaseui-card-actions">
                  <div className="firebaseui-form-actions">
                    <button
                      onClick={() => setInputPhone(false)}
                      className="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                      data-upgraded=",MaterialButton"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={this.handleLogin.bind(this)}
                      disabled={this.state.isButtonDisabled}
                      type="submit"
                      className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                      data-upgraded=",MaterialButton"
                    >
                      Verify
                    </button>
                  </div>
                </div>
                <div className="firebaseui-card-footer">
                  <p className="firebaseui-tos firebaseui-phone-sms-notice">
                    By tapping Verify, an SMS may be sent. Message &amp; data
                    rates may apply.
                  </p>
                  <ul className="firebaseui-tos-list firebaseui-tos">
                    <li className="firebaseui-inline-list-item">
                      <a
                        href="https://habydate.com"
                        className="firebaseui-link firebaseui-tos-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li className="firebaseui-inline-list-item">
                      <a
                        href="https://habydate.com"
                        className="firebaseui-link firebaseui-pp-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
          <CreateUser />
        </div>
      );
    } else {
      return (
        <div className="firebaseui-spa">
          <div id="firebaseui-contianer">
            <div className="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-finish">
              <form onSubmit={this.handleSubmit}>
                <div className="firebaseui-card-header">
                  <h1 className="firebaseui-title">Verify your phone number</h1>
                </div>
                <div className="firebaseui-card-content">
                  <p className="firebaseui-text">
                    Enter the 6-digit code we sent to
                  </p>
                  <div
                    className="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                    data-upgraded=",MaterialTextfield"
                  >
                    <input
                      value={this.state.otp}
                      onChange={this.handleOTPChange}
                      type="number"
                      name="phoneConfirmationCode"
                      className="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"
                    />
                  </div>
                  <div className="firebaseui-error-wrapper">
                    <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error" />
                  </div>
                </div>
                <div className="firebaseui-card-actions">
                  <div className="firebaseui-form-actions">
                    <button
                      onClick={() => this.setState({ sendOTP: false })}
                      className="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                      data-upgraded=",MaterialButton"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={this.handleOTPCheck.bind(this)}
                      type="submit"
                      className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                      data-upgraded=",MaterialButton"
                    >
                      Continue
                    </button>
                  </div>
                </div>
                <div className="firebaseui-card-footer">
                  <ul className="firebaseui-tos-list firebaseui-tos">
                    <li className="firebaseui-inline-list-item">
                      <a
                        href="https://habydate.com/"
                        className="firebaseui-link firebaseui-tos-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li className="firebaseui-inline-list-item">
                      <a
                        href="https://habydate.com/"
                        className="firebaseui-link firebaseui-pp-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  {
    userLogin,
    userLoinError,
    userLoinSuccess,
    userSetBasic,
    userUnsetNewUser
  }
)(InputPhone);