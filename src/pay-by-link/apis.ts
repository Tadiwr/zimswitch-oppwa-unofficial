import { PayByLinkMerchant } from "./config";
import { v4 } from "uuid"

export type TCartItem = {
    name: string,
    currency: string,
    description?: string,
    merchantItemId?: number,
    price: number,
    quantity: number,
    totalAmount: number,
}

export type TNewPaymentLink = {

    /** e.g 'USD', 'ZAR' */
    currency: string,
    amount: number

    /** Default 'DB' */
    paymentType?: string,
    merchantTransactionId?: string,

    /** Customers first name */
    customerFirstName: string,

    /** Customers last name */
    customerLastName: string,

    /** Customers mobile phone number */
    customerMobile: string,

    /** Customer email */
    customerEmail: string

    /** How long the link is valid */
    validity: {
        duration: string,
        unit: "DAY" | "HOUR" | "YEAR" | "MONTH"
    },

    termsAndConditionsUrl?: string,
    privacyPolicyUrl?: string,
    collectBilling?: string,
    mandatoryBilling?: string,
    billingStreet1?: string,
    billingHouseNumber1?: string,
    billingPostCode?: string,
    billingCity?: string,
    billingCountry?: string,
    createQRCode?: boolean,

    /** Cart items the customer is about to purchase */
    cartItems: TCartItem[],

    /** The webpage that the customer is redirect after the transaction*/
    resultUrl: string
}

type TPaymentResult = {
    result: { code: string },
    buildNumber: string,
    timestamp: Date,
    ndc: string,
    id: string,
    link: string,
    qrCode: string
}

function getApiHost(merchant: PayByLinkMerchant) {
    const host = merchant.isTestMercant() ? 'eu-test.oppwa.com' : 'eu-prod.oppwa.com';
    return host;
}

function getUri(merchant: PayByLinkMerchant, endPoint: string) {
    const host = getApiHost(merchant);
    return `https://${host}${endPoint}`;
}

export async function createPaymentLink(merchant: PayByLinkMerchant, config: TNewPaymentLink) {

    const request = async () => {
        const url = getUri(merchant, '/paybylink/v1');

        const data = new URLSearchParams({
            'entityId': merchant.getEntityId(),
            'amount': config.amount.toString(),
            'currency': config.currency,
            'paymentType': config.paymentType ?? 'DB',
            'merchant.name': merchant.getMerchantName(),
            'merchantTransactionId': config.merchantTransactionId ?? v4(),
            'shopperResultUrl': config.resultUrl,
            'customer.givenName': config.customerFirstName,
            'customer.surname': config.customerLastName,
            'customer.mobile': config.customerMobile,
            'customer.email': config.customerEmail,
            'layout.logo': merchant.getLogoUrl() ?? 'https://zimswitch.docs.oppwa.com/themes/devportal_theme/images/more-than-sportswear/logo.png',
            'layout.logoWidth': merchant.getLogoWidthInPx() ?? "300px",
            'layout.logoHeight': merchant.getLogoHeightInPx() ?? "300px",
            'layout.backgroundImage': merchant.getBackgroundImageUrl() ?? '',
            'layout.merchantNameColor': '#ffffff',
            'layout.amountColor': '#ffffff',
            'layout.payButtonColor': merchant.getPayButtonColour() ?? '#0dcaf0',
            'layout.payButtonTextColor': merchant.getPayButtonTextColour() ?? '#ffffff',
            'validUntil': config.validity.duration,
            'validUntilUnit': config.validity.unit,
            'termsAndConditionsUrl': config.termsAndConditionsUrl ?? 'https://mtsTandCs.com',
            'privacyPolicyUrl': config.privacyPolicyUrl ?? 'https://mtsPrivacyPolicy.com',
            'collectBilling': 'street1,houseNumber1,postcode,city,country',
            'mandatoryBilling': 'street1,houseNumber1,postcode,city,country',
            'billing.street1': config.billingStreet1 ?? "",
            'billing.houseNumber1': config.billingHouseNumber1 ?? "",
            'billing.postcode': config.billingPostCode ?? "",
            'billing.city': config.billingCity ?? "",
            'billing.country': config.billingCountry ?? "",
            'createQRCode': 'true',
            'cart.items[0].currency': config.cartItems[0].currency,
            'cart.items[0].description': config.cartItems[0].description ?? "",
            'cart.items[0].merchantItemId': config.cartItems[0].merchantItemId?.toString() ?? "1",
            'cart.items[0].name': config.cartItems[0].name,
            'cart.items[0].price': config.cartItems[0].price.toString(),
            'cart.items[0].quantity': config.cartItems[0].quantity.toString(),
            'cart.items[0].totalAmount': config.cartItems[0].totalAmount.toString()
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${merchant.getBearerToken()}`
                },
                body: data.toString()
            });

            if (!response.ok) {
                console.log("Error creating paymentLink", response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse = (await response.json()) as TPaymentResult;
            return jsonResponse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return await request();
}

type TCheckPaylinkStatusResParamError = {
    name: string,
    value: string,
    message: string
}

type TCheckPaylinkStatusRes = {
    id: string,
    paymentType: string,
    paymentBrand: string,
    amount: number,
    currency: string,
    descriptor: string,
    merchantTransactionId: string,
    result: {
        code: string,
        description: string
    },
    resultDetails: { clearingInstituteName: string },
    card: {
        bin: string,
        last4Digits: string,
        holder: string,
        expiryMonth: string,
        expiryYear: string,
        issuer: { bank: string },
        type: string,
        level: string,
        country: string,
        maxPanLength: string,
        binType: string,
        regulatedFlag: string
    },
    customer: {
        givenName: string,
        surname: string,
        mobile: string,
        email: string,
        ip: string
    },
    threeDSecure: { eci: string },
    customParameters: {
        SHOPPER_EndToEndIdentity: string,
        CTPE_DESCRIPTOR_TEMPLATE: string
    },
    cart: { items: TCartItem[] },
    buildNumber: string,
    timestamp: string,
    ndc: string
}

/** Checking for Payment Status */
export async function getPayLinkStatus(merchant: PayByLinkMerchant, id: string, checkoutId: string) {
    const url = getUri(merchant, `/paybylink/v1/${id}/checkouts/${checkoutId}/payment?entityId=${merchant.getEntityId()}`);

    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${merchant.getBearerToken()}`
        }
    });

    if (!res.ok) {
        throw new Error(`Server responded with ${res.status}. Detailed Error Response
            ${await res.json()}
            ${res} 
        `);
    }

    return (await res.json()) as TCheckPaylinkStatusRes;

}   
