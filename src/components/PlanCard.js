import React, { useState, useRef } from "react"
import Card from '@mui/material/Card';
import { Form } from 'react-bootstrap';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineCheck } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { addToRedeemCoupon } from "../services/FirebaseServices";
import globalActions from "../redux/global/action";

function PlanCard({ title, amount, plan_type, listData, buyPlan, promoCodes, redeemCodes, user_id, dispatch }) {
    const [couponCode, setCouponCode] = useState(null);
    const [deductedAmount, setDeductedAmount] = useState(0);
    const couponRef = useRef(null);
    const handleBuyPlan = (payload) => {
        if (deductedAmount > 0) {
            payload.amount = deductedAmount;
        }
        buyPlan(payload)
    }

    const calculatedDeductedAmount = async () => {
        setCouponCode(null);
        couponRef.current.value = ''
        if (couponCode) {
            const foundedCoupon = promoCodes.find(item => item.promo_code === couponCode)
            if (foundedCoupon) {
                const alreadyRedeemed = redeemCodes.find(item => item.user_id === user_id && item.code === couponCode);
                if (alreadyRedeemed) {
                    toast("This coupon code is already Redeemed by you")
                } else {
                    const newAmount = parseFloat(amount) - parseFloat(foundedCoupon.price)
                    dispatch(globalActions.redeemCoupon())
                    var payload = { code: foundedCoupon.promo_code, user_id }
                    const res = await addToRedeemCoupon(payload);
                    if (res.error === true) {
                        dispatch(globalActions.redeemCouponError())
                        toast("Coupon redeemed failed");
                    } else {
                        dispatch(globalActions.redeemCouponSuccess(payload))
                        setDeductedAmount(newAmount);
                        toast("Coupon redeemed successfully");
                    }
                }
            } else {
                toast("Not a valid Coupon code")
            }
        } else {
            toast("Please Enter a coupon code first")
        }
    }

    return (
        <Card sx={{ maxWidth: "100%", minHeight: 600 }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" className="plan-card-title">
                    {title}
                </Typography>
                <Typography variant="h4" color="text.secondary" className="plan-card-price">
                    {deductedAmount > 0 ? `$${deductedAmount}/${plan_type}` : `$${amount}/${plan_type}`}
                </Typography>
                <List>
                    {listData.map(item => {
                        return (
                            item.name &&
                            <ListItem disablePadding key={item.id}>
                                <ListItemIcon>
                                    <AiOutlineCheck className="plan-card-icon" />
                                </ListItemIcon>
                                <ListItemText primary={item.name} classes={{
                                    primary: "plan-card-item-text"
                                }} />
                            </ListItem>
                        )
                    })}
                    <ListItem disablePadding className="coupon-code">
                        <Form.Control type="text" className="same-input" ref={couponRef} placeholder="Enter coupon code" onChange={(e) => { setCouponCode(e.target.value) }} />
                        <Button className="all-button bt" type="button" onClick={() => calculatedDeductedAmount()}>
                            Submit
                        </Button>
                    </ListItem>

                </List>
                <div className="plan-card-btn">
                    <Button size="large" onClick={() => handleBuyPlan({ amount, plan_type })} className="all-button bt btn btn-primary">Subscribe Now</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default PlanCard