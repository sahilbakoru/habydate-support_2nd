import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import Modal from '@mui/material/Modal';
import actionCreators from "../../redux/actions"
import globalActions from "../../redux/global/action";
import { getAllPlans, getAllPromoCode, getAllRedeemCode, Plans } from "../../services/FirebaseServices";
import PlanCard from "../../components/PlanCard";
import moment from "moment";
import CheckoutForm from "../../components/StripeCard";
import Box from '@mui/material/Box';
import img from "./apple2.png"
import background from "./dating.jpeg"
// import "./membership.css"

function Membership({ global, user }) {
    const [modelOpen, setOpen] = useState(false);
    const [buyData, setBuyData] = useState(null);
    const { plans: { monthData, yearsData }, promoCodes, redeemCodes } = global;
    const { list } = user;
    const cu_model_wrapper = {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: 400,
        display: 'block'
    }

    const monthDataList = [
        {
            id: "monthDataList_1",
            name: monthData?.access_text
        },
        {
            id: "monthDataList_2",
            name: monthData?.world_text
        },
        {
            id: "monthDataList_3",
            name: monthData?.like_u_text
        },
        {
            id: "monthDataList_4",
            name: monthData?.msg_text
        },
        {
            id: "monthDataList_5",
            name: monthData?.swipes_text
        }
    ]
    const yearsDataList = [
        {
            id: "yearsDataList_1",
            name: yearsData?.access_text
        },
        {
            id: "yearsDataList_2",
            name: yearsData?.world_text
        },
        {
            id: "yearsDataList_3",
            name: yearsData?.like_u_text
        },
        {
            id: "yearsDataList_4",
            name: yearsData?.msg_text
        },
        {
            id: "yearsDataList_5",
            name: yearsData?.swipes_text
        }
    ]

    const dispatch = useDispatch();
    useEffect(() => {
        Plans.doc("Months").onSnapshot(snap => {
            const monthData = snap.data()
            Plans.doc("Years").onSnapshot(snap1 => {
                const yearsData = snap1.data()
                const finalData = { monthData, yearsData };
                getAll(finalData)
            });
        });

    }, [])
    const getAll = async (plans) => {
        dispatch(globalActions.getAllPlans());
        // const plans = await getAllPlans();
        const promoCodes = await getAllPromoCode();
        const redeemCodes = await getAllRedeemCode(list.uid)
        const finalRes = {
            plans,
            promoCodes: promoCodes.data,
            redeemCodes: redeemCodes.data
        }
        dispatch(globalActions.getAllPlansSuccess(finalRes));
    }

    const handleBuyPlan = (value) => {
        let expireDate = "";
        let amount = "";
        if (value.plan_type.trim() === 'Monthly') {
            expireDate = moment().add(30, 'd').unix();
            amount = value.amount
        } else {
            expireDate = moment().add(365, 'd').unix();
            amount = value.amount
        }
        setBuyData({ expireDate, amount });
        handleOpenCloseModel()
    }

    const handleOpenCloseModel = () => {
        setOpen(!modelOpen)
    }
// background-image: url("bgdesert.jpg");
    return (
        <div className="container" style={{ backgroundImage: `url(${background})`,backgroundSize:"100%" }} >
            <div className="row">
                <h1 className="plan-title">Find your true love, Go to App.</h1>

                <h3 className="plan-title">OR Download</h3>
          
            </div>
            <center><a href="https://apps.apple.com/in/app/habydate/id1577040185"  target="_blank" > <img src={img} style={{height: "90%", width:"30%", marginBottom:"33%" }} alt="app store" /></a></center>     
            <div className="row plan-card">
                {monthData && <div className="col-sm-6 col-lg-6 col-md-6">
                    {/* <PlanCard
                        title={monthData?.Plan_name}
                        amount={monthData?.Price}
                        plan_type={monthData?.Validity}
                        listData={monthDataList}
                        buyPlan={handleBuyPlan}
                        promoCodes={promoCodes}
                        redeemCodes={redeemCodes}
                        user_id={list.uid}
                        dispatch={dispatch}
                    />
                </div>}
                {yearsData && <div className="col-sm-6 col-lg-6 col-md-6">
                    <PlanCard
                        title={yearsData?.Plan_name}
                        amount={yearsData?.Price}
                        plan_type={yearsData?.Validity}
                        listData={yearsDataList}
                        buyPlan={handleBuyPlan}
                        promoCodes={promoCodes}
                        redeemCodes={redeemCodes}
                        user_id={list.uid}
                        dispatch={dispatch}
                    /> */}
                </div>}
            </div>
            {/* <Modal
                open={modelOpen}
                onClose={handleOpenCloseModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={cu_model_wrapper}>
                    <CheckoutForm buyData={buyData} user={user.list} dispatch={dispatch} handleOpenCloseModel={handleOpenCloseModel} />
                </Box>
            </Modal> */}
        </div >
    )
}

const mapStateToProps = (states) => {
    return {
        global: states.global,
        user: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Membership)