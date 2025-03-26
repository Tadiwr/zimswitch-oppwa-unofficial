// import * as payByLink from "./pay-by-link";

export * as payByLink from "./pay-by-link";

/** Comment out code below to try example */

// const mainProcess = async () => {


//     const merchant = payByLink.createTestMerchant({
//         merchantName: "Codapt Swag",
//         logoHeightInPx: "50px",
//         logoWidthInPx: "100px",
//         logoUrl: "https://kyrossports.com/wp-content/uploads/2022/10/Kyros-Logo-retina.png",
//         payButtonColour: "black",
//         payButtonTextColour: "white"
//     });

//     const link = await payByLink.createPaymentLink(merchant, {
//         customerFirstName: "Tadiwanashe",
//         customerLastName: "Shangwa",
//         currency: "USD",
//         customerEmail: "tshxng@gmail.com",
//         customerMobile: "263782925928",
//         amount: 350.0,
//         validity: {
//             duration: "1", unit: "DAY"
//         },
//         cartItems: [
//             {
//                 name: "Xbox Series X",
//                 currency: "USD",
//                 description: "Next Gen gaming pushed to its limits",
//                 price: 300.0,
//                 quantity: 1,
//                 totalAmount: 300.0
//             },

//             {
//                 name: "Elite 2 Controller",
//                 currency: "USD",
//                 description: "Next Gen gaming controller",
//                 price: 50.0,
//                 quantity: 1,
//                 totalAmount: 50.0
//             }
//         ],
//         resultUrl: "http://locahost:3000/payments"
//     });

//     console.log(link);
    
//     // const status = await payByLink.getPayLinkStatus(merchant, "57677ef3-d285-4f6a-b7be-329e2163ffe4", "68B77A92EBB731346AB0105E00CE6652.uat01-vm-tx03")

//     // console.log(status.cart);
    
    
// }
// mainProcess();