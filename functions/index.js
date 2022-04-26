// //const functions = require("firebase-functions");
// //const { STRIPE_SECRET } = require("../src/utils/common")
// // const stripe = require('stripe')("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");
// //const stripeTest = require('stripe')(STRIPE_SECRET);

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
// exports.payWithStripe = functions.https.onRequest((request, response) => {
//     // Set your secret key: remember to change this to your live secret key in production
//     // See your keys here: https://dashboard.stripe.com/account/apikeys
//     stripe.charges
//         .create({
//             amount: request.body.amount,
//             currency: request.body.currency,
//             source: request.body.token,
//             description: request.body.description,
//         })
//         .then((charge) => {
//             response.send({ response: charge, error: null });
//         })
//         .catch((err) => {
//             response.send({ error: err });
//         });
// });

// exports.payWithTestStripe = functions.https.onRequest((request, response) => {
//     // Set your secret key: remember to change this to your live secret key in production
//     // See your keys here: https://dashboard.stripe.com/account/apikeys
//     stripeTest.charges
//         .create({
//             amount: request.body.amount,
//             currency: request.body.currency,
//             source: request.body.token,
//             description: request.body.description,
//         })
//         .then((charge) => {
//             response.send({ response: charge, error: null });
//         })
//         .catch((err) => {
//             response.send({ error: err });
//         });
// });