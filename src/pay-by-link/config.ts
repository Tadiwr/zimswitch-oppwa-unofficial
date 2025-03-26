// Configuiring a Merchant Class

export class Merchant {

    /** The bearer token issued by Zimswitch */
    private bearerToken: string;

    /** Entity Id issued by Zimswitch */
    private entityId: string;

    /** The name of the merchant */
    private merchantName: string;

    /** The logo of the merchant to be displayed on the checkout link */
    private logoUrl? : string;

    /** A background image to be displayed on the hosted checkout page */
    private backgroundImageUrl?: string;

    private logoWidthInPx? : string;

    private logoHeightInPx?: string;

    private payButtonColour?: string;

    private payButtonTextColour?: string;

    private testMerchantFlag: boolean

    public constructor(config: TCreatePayByLinkMerchant) {

        this.bearerToken = config.bearerToken;
        this.entityId = config.entityId;
        this.merchantName = config.merchantName;
        this.logoUrl = config.logoUrl;
        this.backgroundImageUrl = config.backgroundImageUrl;
        this.logoWidthInPx = config.logoWidthInPx ?? "300px";
        this.logoHeightInPx = config.logoHeightInPx ?? "300px";
        this.backgroundImageUrl = config.backgroundImageUrl;
        this.payButtonColour = config.payButtonColour ?? "blue";
        this.payButtonTextColour = config.payButtonTextColour ?? "white";
        this.testMerchantFlag = config.isTestMerchant ?? false;
    }

    public getBearerToken() {return this.bearerToken}
    public getEntityId() {return this.entityId}
    public getMerchantName() {return this.merchantName}
    public getLogoUrl() {return this.logoUrl}
    public getLogoWidthInPx() {return this.logoWidthInPx}
    public getLogoHeightInPx() {return this.logoHeightInPx}
    public getBackgroundImageUrl() {return this.backgroundImageUrl}
    public getPayButtonColour() {return this.payButtonColour}
    public getPayButtonTextColour() {return this.payButtonTextColour}
    public isTestMercant() {return this.testMerchantFlag}
}

type TCreatePayByLinkMerchant = {
    bearerToken: string,
    entityId: string,
    merchantName: string,
    logoUrl?: string,
    backgroundImageUrl?: string,
    logoWidthInPx? : string,
    logoHeightInPx? : string,
    payButtonColour? : string,
    payButtonTextColour? : string,
    isTestMerchant?: boolean
}

export function createPayByLinkMerchant(config: TCreatePayByLinkMerchant) {
    return new Merchant(config);
}

type TCreateTestPayByLinkMerchant = {
    merchantName: string,
    logoUrl?: string,
    backgroundImageUrl?: string,
    logoWidthInPx? : string,
    logoHeightInPx? : string,
    payButtonColour? : string,
    payButtonTextColour? : string,
    isTestMerchant?: boolean
}

export function getTestPayByLinkMerchant(config: TCreateTestPayByLinkMerchant) {
    
    return new Merchant({
        bearerToken: "OGFjN2E0Yzc5Mzk0YmRjODAxOTM5NzM2ZjFhNzA2NDF8enlac1lYckc4QXk6bjYzI1NHNng=",
        entityId: "8ac7a4c79394bdc801939736f1d10646",
        merchantName: config.merchantName,
        logoUrl: config.logoUrl,
        backgroundImageUrl: config.backgroundImageUrl,
        logoWidthInPx: config.logoWidthInPx,
        logoHeightInPx: config.logoHeightInPx,
        payButtonColour: config.payButtonColour,
        payButtonTextColour: config.payButtonTextColour,
        isTestMerchant: true
    });
}