import * as payByLink from "./pay-by-link";

export * as payByLink from "./pay-by-link";

const mainProcess = async () => {


    const merchant = payByLink.getTestPayByLinkMerchant({
        merchantName: "Codapt Swag",
        backgroundImageUrl: "https://images.wallpapersden.com/image/download/pink-blue-gradient_bW1sbmuUmZqaraWkpJRsa21lrWloZ2U.jpg"
    });

    const link = await payByLink.createPaymentLink(merchant, {
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

    const status = await payByLink.getPayLinkStatus(merchant, "9969a94a-e257-4d9a-9b16-799a538abe4b", "6F2546EB06E43B9A2455E8D4540E180A.uat01-vm-tx04")

    console.log(status);
    
    
}
mainProcess();