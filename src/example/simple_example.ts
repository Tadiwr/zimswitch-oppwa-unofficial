import { payByLink } from "..";

const payByLinkExample = async () => {


    const merchant = payByLink.createTestMerchant({
        merchantName: "Kyros Sports",
        logoHeightInPx: "100px",
        logoWidthInPx: "200px",
        logoUrl: "https://kyrossports.com/wp-content/uploads/2022/10/Kyros-Logo-retina.png",
        payButtonColour: "green",
        payButtonTextColour: "white"
    });

    const link = await payByLink.createPaymentLink(merchant, {
        customerFirstName: "Tadiwanashe",
        customerLastName: "Shangwa",
        currency: "USD",
        customerEmail: "tshxng@gmail.com",
        customerMobile: "263782925928",
        amount: 30.6,
        validity: {
            duration: "1", unit: "DAY"
        },
        cartItems: [
            {
                name: "Xbox Series X",
                currency: "USD",
                description: "Next Gen gaming pushed to its limits",
                price: 30.6,
                quantity: 1,
                totalAmount: 30.6
            },
        ],
        resultUrl: "http://locahost:3000/payments"
    });

    console.log(link);

    // const status = await payByLink.getPayLinkStatus(merchant, "57677ef3-d285-4f6a-b7be-329e2163ffe4", "68B77A92EBB731346AB0105E00CE6652.uat01-vm-tx03")

    //  console.log(status.cart);


}