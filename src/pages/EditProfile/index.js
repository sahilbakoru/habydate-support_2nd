import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect, useDispatch } from 'react-redux'
import moment from 'moment';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { toast } from 'react-toastify';
import { updateUser } from "../../services/FirebaseServices"
import userActions from '../../redux/user/actions'
import { bindActionCreators } from 'redux';
import actionCreators from "../../redux/actions"
import { heightData, getAge } from '../../utils/common';

function EditProfile({ user, setIsNewUser, isNewUser }) {
    const { list, basicUser } = user
    const [fromValues, setFromValue] = useState(list)
    const [termCheck, setTermCheck] = useState(false);
    const dispatch = useDispatch()

    const handleValueChange = async (value, type) => {
        const allValues = { ...fromValues }
        allValues[type] = value
        setFromValue({ ...allValues })

    }

    const handleTermChange = () => {
        setTermCheck(!termCheck);
    }

    const handleFormSubmit = async () => {

        if (isNewUser) {
            fromValues.email = fromValues.email ? fromValues.email : basicUser.email;
            fromValues.name = fromValues.name ? fromValues.name : basicUser.name;
            fromValues.username = fromValues.username ? fromValues.username : getUserName();
            fromValues.profilePic = basicUser.profilePic ? basicUser.profilePic : "";
            fromValues.photos = [];
            fromValues.uid = fromValues.uid ? fromValues.uid : basicUser.uid;
            let userLoc = localStorage.getItem("location");
            if (userLoc) {
                userLoc = JSON.parse(userLoc);
                userLoc.geoHash = uuidv4();
                fromValues.location = userLoc;
            }
            fromValues.active = "1";
            fromValues.likedReadCount = 0;
            fromValues.notificationOn = true
            fromValues.payee = "0"
            fromValues.stepCompleted = 9
            var age = getAge(fromValues.DoB);
            if (termCheck) {
                if (fromValues.gender) {
                    if (age > 18) {
                        dispatch(userActions.userCreate())
                        const updatedUser = await updateUser(fromValues)
                        if (updatedUser.error === false) {
                            dispatch(userActions.userCreateSuccess(fromValues))
                            // setIsNewUser(false);
                        } else {
                            dispatch(userActions.userCreateError())
                        }
                    } else {
                        toast("Age Must be greater then 18");
                    }
                } else {
                    toast("Please select your gender");
                }

            } else {
                toast("Please accept term and conditions");
            }
        } else {
            dispatch(userActions.userUpdate())
            const updatedUser = await updateUser(fromValues)
            if (updatedUser.error === false) {
                dispatch(userActions.userUpdateSuccess(fromValues))
            } else {
                dispatch(userActions.userUpdateError())
            }
        }
    }

    const getUserName = () => {
        let email = basicUser.email ? basicUser.email : ""
        let username = "";
        if (email) {
            let emailArr = email.split('@');
            username = emailArr[0];
        }
        return username;
    }
    return (
        <div className="under-common">
            <Form>
                <div className="row">
                    {isNewUser
                        ?
                        <>
                            <Form.Group className="col-lg-6" controlId="formBasicEmail">
                                <div className="common-input">
                                    <Form.Label className="same-label">Email</Form.Label>
                                    <Form.Control type="text" disabled={basicUser.email ? true : false} className="same-input" placeholder="Enter email" defaultValue={basicUser?.email} onChange={(e) => handleValueChange(e.target.value, 'email')} />
                                </div>
                            </Form.Group>
                            <Form.Group className="col-lg-6" controlId="formBasicEmail">
                                <div className="common-input">
                                    <Form.Label className="same-label">Name</Form.Label>
                                    <Form.Control type="text" className="same-input" placeholder="Enter name" defaultValue={basicUser?.name} onChange={(e) => handleValueChange(e.target.value, 'name')} />
                                </div>
                            </Form.Group>
                            <Form.Group className="col-lg-6" controlId="formBasicEmail">
                                <div className="common-input">
                                    <Form.Label className="same-label">username</Form.Label>
                                    <Form.Control type="text" className="same-input" placeholder="Enter username" defaultValue={getUserName()} onChange={(e) => handleValueChange(e.target.value, 'username')} />
                                </div>
                            </Form.Group>
                        </>
                        : ""}

{/* added bs sahil  */}

<Form.Group className="col-lg-6" controlId="formBasicEmail">
                        <div className="common-input">
                            <Form.Label className="same-label">About me</Form.Label>
                            <Form.Control type="text" className="same-input" placeholder="Enter bio" defaultValue={list?.bio} onChange={(e) => handleValueChange(e.target.value, 'bio')} />
                        </div>
                    </Form.Group>

{/* added bs sahil end  */}

                    <Form.Group className="col-lg-6" controlId="formBasicEmail">
                        <div className="common-input">
                            <Form.Label className="same-label">Age</Form.Label>
                            <Form.Control type="text" className="same-input" placeholder="Enter age" defaultValue={list?.age} onChange={(e) => handleValueChange(e.target.value, 'age')} />
                        </div>
                    </Form.Group>

                    <Form.Group className="col-lg-6" controlId="formBasicHeight">
                        <div className="common-input">
                            <Form.Label className="same-label">Height</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Height" defaultValue={list?.height} onChange={(e) => handleValueChange(e.target.value, 'height')} >
                                {heightData.map(item => {
                                    return <option value={item.title} key={item.id}>{item.title}</option>
                                })}
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Income</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Income" defaultValue={list?.income} onChange={(e) => handleValueChange(e.target.value, 'income')} >
                                <option value="">None</option>
                                <option value="25000-50000">25000-50000</option>
                                <option value="50000-100000">50000-100000</option>
                                <option value="over 100000">over 100000</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Marital status</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Marital status" defaultValue={list?.maritalStatus} onChange={(e) => handleValueChange(e.target.value, 'maritalStatus')} >
                                <option value="None">None</option>
                                <option value="Single">Single</option>
                                <option value="Single mom">Single mom</option>
                                <option value="Single dad">Single dad</option>
                                <option value="In a relationship">In a relationship</option>
                                <option value="Married">Married</option>
                                <option value="Separated">Separated</option>
                                <option value="Divorce">Divorce</option>
                                <option value="Widowed">Widowed</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Body type </Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Body type" defaultValue={list?.bodyType} onChange={(e) => handleValueChange(e.target.value, 'bodyType')} >
                                <option value="None">None</option>
                                <option value="Thin">Thin</option>
                                <option value="Average">Average</option>
                                <option value="Athletic">Athletic</option>
                                <option value="Curvey">Curvey</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Drinking habit</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Drinking habit" defaultValue={list?.drinkingStatus} onChange={(e) => handleValueChange(e.target.value, 'drinkingStatus')} >
                                <option value="None">None</option>
                                <option value="Non-Drinker">Non-Drinker</option>
                                <option value="Social Drinker">Social Drinker</option>
                                <option value="Heavy Drinker">Heavy Drinker</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Eating habit</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Eating habit" defaultValue={list?.eatingStatus} onChange={(e) => handleValueChange(e.target.value, 'eatingStatus')} >
                                <option value="None">None</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Education</Form.Label>
                            <Form.Select className="same-input" placeholder="Education" defaultValue={list?.education} onChange={(e) => handleValueChange(e.target.value, 'education')} >
                                <option value="None">None</option>
                                <option value="High School">High School</option>
                                <option value="College">College</option>
                                <option value="Bachelor Degree">Bachelor Degree</option>
                                <option value="Postgraduate">Postgraduate</option>
                                <option value="Master">Master</option>
                                <option value="Phd/Doctorate">Phd/Doctorate</option>
                                <option value="Postdoctoral">Postdoctoral</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Personality</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Personality" defaultValue={list?.personality} onChange={(e) => handleValueChange(e.target.value, 'personality')} >
                                <option value="None">None</option>
                                <option value="Funny">Funny</option>
                                <option value="Romantic">Romantic</option>
                                <option value="College">College</option>
                                <option value="Open-minded">Open-minded</option>
                                <option value="Faithful">Faithful</option>
                                <option value="Shy">Shy</option>
                                <option value="Moody">Moody</option>
                                <option value="Entrepreneur">Entrepreneur</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Religion</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Religion" defaultValue={list?.religion} onChange={(e) => handleValueChange(e.target.value, 'religion')} >
                                <option value="None">None</option>
                                <option value="Christian">Christian</option>
                                <option value="Muslim">Muslim</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Atheist">Atheist</option>
                                <option value="Sikh">Sikh</option>
                                <option value="Buddhist">Buddhist</option>
                                <option value="Others">Others</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <Form.Label className="same-label">Sexuality</Form.Label>
                        <Form.Select className="same-input" type="text" placeholder="Sexuality" defaultValue={list?.sexuality} onChange={(e) => handleValueChange(e.target.value, 'sexuality')} >
                            <option value="None">None</option>
                            <option value="Straight">Straight</option>
                            <option value="Gay">Gay</option>
                            <option value="Lesbian">Lesbian</option>
                            <option value="Bisexual">Bisexual</option>
                            <option value="Trans">Trans</option>
                            <option value="Others">Others</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Smoking status</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="Smoking status" defaultValue={list?.smokingStatus} onChange={(e) => handleValueChange(e.target.value, 'smokingStatus')} >
                                <option value="None">None</option>
                                <option value="Non-smoker">Non-smoker</option>
                                <option value="light Smoker">light Smoker</option>
                                <option value="Heavy Smoker">Heavy Smoker</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">I'm Looking For</Form.Label>
                            <Form.Select className="same-input" type="text" placeholder="looking For" defaultValue={list?.lookingFor} onChange={(e) => handleValueChange(e.target.value, 'lookingFor')} >
                                <option value="None">None</option>
                                <option value="Dating">Dating</option>
                                <option value="Friendship">Friendship</option>
                                <option value="Chat Buddy">Chat Buddy</option>
                                <option value="High Buddy">High Buddy</option>
                                <option value="Hookups">Hookups</option>
                                <option value="Friends With Benefits">Friends With Benefits</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group className="col-lg-6" controlId="formBasicIncome">
                        <div className="common-input">
                            <Form.Label className="same-label">Date of Birth</Form.Label>
                            <DatePicker className="same-input" onChange={(val) => handleValueChange(moment(val).format("MM/DD/YYYY"), "DoB")}
                                value={fromValues ? fromValues.DoB ? new Date(fromValues.DoB) : "" : ""} />
                        </div>
                    </Form.Group>
                    {isNewUser ?
                        <Form.Group className="col-lg-6 cu-checkbox" controlId="formBasicCheckbox">
                            <div className="common-input">
                                <Form.Check
                                    inline
                                    label="Man"
                                    name="gender-radio"
                                    id="gender-radio1"
                                    type="radio"
                                    defaultChecked={list?.gender === 'Man' ? true : false}
                                    onClick={() => handleValueChange('Man', 'gender')}
                                />
                                <Form.Check
                                    inline
                                    label="Women"
                                    name="gender-radio"
                                    id="gender-radio2"
                                    type="radio"
                                    defaultValue={list?.gender}
                                    defaultChecked={list?.gender === 'Women' ? true : false}
                                    onClick={() => handleValueChange('Women', 'gender')}
                                />
                                <Form.Check
                                    inline
                                    label="Non-binary"
                                    name="gender-radio"
                                    id="gender-radio2"
                                    type="radio"
                                    defaultValue={list?.gender}
                                    defaultChecked={list?.gender === 'Non-binary' ? true : false}
                                    onClick={() => handleValueChange('Non-binary', 'gender')}
                                />
                            </div>

                        </Form.Group>

                        : null}

                    <div className="col-lg-6">
                    </div>
                    {isNewUser ? <div className="col-lg-12">
                        <div className="common-input">
                            <Form.Check
                                inline
                                className="same-input"
                                label={<p className="same-label" style={{ marginTop: "16px" }}>By creating account you agree to our <a href="https://habydate.com/term-condition/">terms and conditions</a></p>}
                                onClick={() => handleTermChange()}
                            />
                        </div>
                    </div> : null}
                    <div className="col-lg-12">
                        <div className="common-input">
                            <Button className="all-button bt" type="button" onClick={handleFormSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </Form >
        </div >
    )
}

const mapStateToProps = (states) => {
    return {
        user: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)