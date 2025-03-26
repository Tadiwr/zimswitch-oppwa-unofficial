import { getUri, getUriWithEntityParam, merchantAuthorization } from "../shared/api.utils";
import { Merchant } from "./config";
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

export async function createPaymentLink(merchant: Merchant, config: TNewPaymentLink) {

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
            'layout.logo': merchant.getLogoUrl() ?? "",
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
            'createQRCode': 'true'
        });

        config.cartItems.map((item, index) => {

            data.append(`cart.items[${index}].currency`, item.currency);
            data.append(`cart.items[${index}].description`, item.description ?? "");
            data.append(`cart.items[${index}].merchantItemId`, item.merchantItemId?.toString() ?? (index + 1).toString());
            data.append(`cart.items[${index}].name`, item.name);
            data.append(`cart.items[${index}].price`, item.price.toString());
            data.append(`cart.items[${index}].quantity`, item.quantity.toString());
            data.append(`cart.items[${index}].totalAmount`, item.totalAmount.toString());
        })

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

/** Checking the status of a payment */
export async function getPaymentStatus(merchant: Merchant, id: string, checkoutId: string) {
    const url = getUriWithEntityParam(merchant, `/paybylink/v1/${id}/checkouts/${checkoutId}/payment`);

    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${merchant.getBearerToken()}`,
            "Accept": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error(`Server responded with ${res.status}. Detailed Error Response
            ${res} 
        `);
    }

    return (await res.json()) as TCheckPaylinkStatusRes;

}

export type TPaymentLink = {
    paymentLinkId: string,
    entityId: string,
    merchantId: string,
    status: number,
    creationDate: Date,
    validUntil: Date,
    checkoutId?: string,
    transactionId?: string,
    checkoutCreationDate?: string,
    result?: {
        code: string,
        description: string
    }
}

export type TGetPaymentLinkStatusRes = {
    result: { code: string },
    buildNumber: string,
    timestamp: Date,
    ndc: string,
    paymentLinks: TPaymentLink[]
}

/** Check the status of a payment link */
export async function getPaymentLinkStatus(merchant: Merchant, paymentLinkId: string) {
    const url = getUriWithEntityParam(merchant, `/paybylink/v1/${paymentLinkId}`);

    const res = await fetch(url, {
        headers: merchantAuthorization(merchant)
    });

    return (await res.json()) as TGetPaymentLinkStatusRes;
}

export type TSendPaymentLinkViaSmsOption = {
    /** The name of the SMS sender, usually the name of the merchant */
    from?: string,

    /** Phone number of SMS receipient */
    smsTo:string
}

export async function sendPaymentLinkViaSms(merchant: Merchant, paymentLinkId: string, options: TSendPaymentLinkViaSmsOption) {
    const url = getUri(merchant, `/paybylink/v1/${paymentLinkId}/sms`);

    const data = new URLSearchParams({
        'entityId':merchant.getEntityId(),
		'from': options.from ?? merchant.getMerchantName(),
		'smsTo':options.smsTo
    });

    const res = await fetch(url, {
        method: "POST",
        headers: merchantAuthorization(merchant),
        body: data.toString()
    });

    return await res.json();
}