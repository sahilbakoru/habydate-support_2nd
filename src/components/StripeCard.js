import React from 'react';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_KEY } from "../utils/common"
import { toast } from 'react-toastify';
import { paymentUsingCard } from '../services/paymentActions';
import { updateUser } from '../services/FirebaseServices';
import userActions from '../redux/user/actions';
import "./stripe.css"

const stripePromise = loadStripe(STRIPE_KEY);


const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const { dispatch, user, buyData, handleOpenCloseModel } = props
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (elements == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        const response = await stripe.createToken(elements.getElement(CardElement))

        if (error) {
            toast("Something went wrong with payment")
        } else {
            paymentUsingCard({
                amount: buyData.amount,
                currency: 'usd',
                token: response.token.id,
                description: 'HabyDate plan purchased.',
            }).then(async (response) => {
                if (response.error) {
                    handleOpenCloseModel();
                } else {
                    handleOpenCloseModel();
                    dispatch(userActions.userUpdate())
                    if (buyData.initPay) {
                        user.payee = '1'
                        user.packageEndDate = buyData.expireDate;
                    } else {
                        user.packageEndDate = buyData.expireDate;
                    }
                    const updatedUser = await updateUser(user)
                    if (updatedUser.error === false) {
                        dispatch(userActions.userUpdateSuccess(user))
                        toast("Payment successful");
                    } else {
                        dispatch(userActions.userUpdateError())
                        toast("Payment failed");
                    }

                }
            }).catch((error) => {
                console.log("error", error);
            });
        }


    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="payment-element" />
            <button type="submit" disabled={!stripe || !elements} className="btn btn-lg btn-block all-button bt">
                Pay
            </button>
        </form>
    );
};

const Wrapper = (props) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm {...props} />
    </Elements>
);

export default Wrapper;