import { STRIPE_CLOUD_SERVER_URL } from "../utils/common";
import axios from 'axios';

export function paymentUsingCard(parameter) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({
            "amount": parameter.amount,
            "currency": "usd",
            "token": parameter.token,
            "description": "HabyDate plan purchased"
        });

        var config = {
            method: 'post',
            url: STRIPE_CLOUD_SERVER_URL,
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*"
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.error) {
                    resolve({ error: true, data: [] })
                } else {
                    resolve({ error: false, data: [] })
                }

            })
            .catch(function (error) {
                console.log({ error: true, data: [] });
            });
    });
}