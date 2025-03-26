import * as payByLink from "./pay-by-link";

export * as payByLink from "./pay-by-link";

const mainProcess = async () => {


    const merchant = payByLink.getTestPayByLinkMerchant({
        merchantName: "Codapt Swag",
        backgroundImageUrl: "https://images.wallpapersden.com/image/download/pink-blue-gradient_bW1sbmuUmZqaraWkpJRsa21lrWloZ2U.jpg",
        logoUrl: "https://kyrossports.com/wp-content/uploads/2022/10/Kyros-Logo-retina.png"
    });

    // const link = await payByLink.createPaymentLink(merchant, {
    //     customerFirstName: "Tadiwanashe",
    //     customerLastName: "Shangwa",
    //     currency: "USD",
    //     customerEmail: "tshxng@gmail.com",
    //     customerMobile: "263782925928",
    //     amount: 350.0,
    //     validity: {
    //         duration: "1", unit: "DAY"
    //     },
    //     cartItems: [
    //         {
    //             name: "Xbox Series X",
    //             currency: "USD",
    //             description: "Next Gen gaming pushed to its limits",
    //             price: 300.0,
    //             quantity: 1,
    //             totalAmount: 300.0
    //         },

    //         {
    //             name: "Elite 2 Controller",
    //             currency: "USD",
    //             description: "Next Gen gaming controller",
    //             price: 50.0,
    //             quantity: 1,
    //             totalAmount: 50.0
    //         }
    //     ],
    //     resultUrl: "http://locahost:3000/payments"
    // });

    // console.log(link);

    const linkStatus = await payByLink.getPaymentLinkStatus(merchant, "faca95f2-83af-4f21-840b-9234f89143bb");
    console.log(linkStatus);

    await payByLink.deletePaymentLink(merchant, "faca95f2-83af-4f21-840b-9234f89143bb")
    
}
mainProcess();