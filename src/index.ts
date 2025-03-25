import * as payByLink from "./pay-by-link";

export * as payByLink from "./pay-by-link";

const merchant = payByLink.getTestPayByLinkMerchant({
    merchantName: "Codapt Swag",
    backgroundImageUrl: "https://images.wallpapersden.com/image/download/pink-blue-gradient_bW1sbmuUmZqaraWkpJRsa21lrWloZ2U.jpg"
});

const link = payByLink.createPaymentLink(merchant, {
    customerFirstName: "Tadiwanashe",
    customerLastName: "Shangwa",
    currency: "USD",
    customerEmail: "tshxng@gmail.com",
    customerMobile: "263782925928",
    amount: 300.0,
    validity: {
        duration: "1", unit: "DAY"
    },
    cartItems: [
        {
            name: "Xbox Series X",
            currency: "USD",
            description: "Next Gen gaming pushed to its limits",
            price: 300.0,
            quantity: 1,
            totalAmount: 300.0
        }
    ],
    resultUrl: "http://locahost:3000/payments"
});

link.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})
