const getDifferentInTime = (date, rev = false) => {
    var today = new Date();
    var paymentDate = new Date(date);
    // console.log("............", paymentDate, date, today)
    var diffMs = rev === true ? (today - paymentDate) : (paymentDate - today);
    var minutes = Math.floor(diffMs / 60000);
    var seconds = ((diffMs % 60000) / 1000).toFixed(0);
    let diffMins = minutes;
    let days = parseInt(minutes / 1440)
    const finRes = { diffMins, diffMs, days, seconds }
    // console.log("..............finres", finRes)
    return finRes
}

const heightData = [
    {
        id: 1,
        title: `4'9''`,
        size: `145cm`,
        selected: false,
    },
    {
        id: 2,
        title: `4'10''`,
        size: `147.5cm`,
        selected: false,
    },
    {
        id: 3,
        title: `4'11''`,
        size: `150cm`,
        selected: false,
    },
    {
        id: 4,
        title: `5'0''`,
        size: `152.5cm`,
        selected: false,
    },
    {
        id: 5,
        title: `5'1''`,
        size: `155cm`,
        selected: false,
    },
    {
        id: 6,
        title: `5'2''`,
        size: `157.5cm`,
        selected: false,
    },
    {
        id: 7,
        title: `5'3''`,
        size: `160cm`,
        selected: false,
    },
    {
        id: 8,
        title: `5'4''`,
        size: `162.5cm`,
        selected: false,
    },
    {
        id: 9,
        title: `5'5''`,
        size: `165cm`,
        selected: false,
    },
    {
        id: 10,
        title: `5'6''`,
        size: `167.5cm`,
        selected: false,
    },
    {
        id: 11,
        title: `5'7''`,
        size: `170cm`,
        selected: false,
    },
    {
        id: 12,
        title: `5'8''`,
        size: `172.5cm`,
        selected: false,
    },
    {
        id: 13,
        title: `5'9''`,
        size: `175cm`,
        selected: false,
    },
    {
        id: 14,
        title: `5'10''`,
        size: `177.5cm`,
        selected: false,
    },
    {
        id: 15,
        title: `5'11''`,
        size: `180cm`,
        selected: false,
    },
    {
        id: 16,
        title: `6'0''`,
        size: `182.5cm`,
        selected: false,
    },
    {
        id: 17,
        title: `6'1''`,
        size: `185cm`,
        selected: false,
    },
    {
        id: 18,
        title: `6'2''`,
        size: `187.5cm`,
        selected: false,
    },
    {
        id: 19,
        title: `6'3''`,
        size: `190cm`,
        selected: false,
    },
    {
        id: 20,
        title: `6'4''`,
        size: `192.5cm`,
        selected: false,
    },
    {
        id: 21,
        title: `6'5''`,
        size: `195cm`,
        selected: false,
    },
];

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// const STRIPE_KEY = "pk_test_51JMcPsKm6zdAy9RlDOt4Vq45rfWt5HOAYaR4emVU44x37fkQdUCcjETWr88QagpTQdIdPG8eazNAYnfH1JFlPCwN00vYIr3fg0"
// const STRIPE_SECRET = "sk_test_51JMcPsKm6zdAy9Rl9Baw4aFjyDp52VYebTNgPaunbCyoJZvzghMHmEtSlKOisBIDvsCyf4w39KaOOv3CUq8J04zx00DxR0uxfE"


const STRIPE_KEY = "pk_live_51JMcPsKm6zdAy9RlGElyCde6XqJZykgPM40Lt8m7TOXgPfzzwtkuVCrS3USLFOZXYHGx9Oz5RqegbFiZ71qBGOOe00W9pNQwE1"
const STRIPE_SECRET = "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"
// const STRIPE_CLOUD_SERVER_URL = "https://us-central1-dating-app-25717.cloudfunctions.net/payWithStripe"
// const STRIPE_CLOUD_SERVER_URL = "https://us-central1-dating-app-25717.cloudfunctions.net/payWithTest_US_Stripe"
const STRIPE_CLOUD_SERVER_URL = "https://us-central1-dating-app-25717.cloudfunctions.net/payWithTestStripe"
export {
    getDifferentInTime,
    heightData,
    getAge,
    STRIPE_KEY,
    STRIPE_SECRET,
    STRIPE_CLOUD_SERVER_URL
}