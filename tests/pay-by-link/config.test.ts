import * as paylink from "../../src/pay-by-link";
import {expect, test} from "vitest";

test("returns a correct test merchant", () => {
    const merchant = paylink.createTestMerchant({
        merchantName: "Test Merchant"
    });

    expect(merchant.isTestMercant()).toBe(true);
});

test("returns merchant with correct details", async () => {
    const config: paylink.TCreatePayByLinkMerchant = {
        merchantName: "Tadiwanashe Shangwa",
        bearerToken: "SOME_TOKEN",
        entityId: "SOME ENTITY",
        logoUrl: "https://kyrossports.com/wp-content/uploads/2022/10/Kyros-Logo-retina.png",
        logoHeightInPx: "50px",
        logoWidthInPx: "50px",
        payButtonColour: "#000000",
        payButtonTextColour: "#ffffff",
        backgroundImageUrl: "https://images.unsplash.com/photo-1517340650606-17091f8e86ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isTestMerchant: true
    };

    const merchant = paylink.createMerchant(config);

    expect(merchant.getMerchantName()).toBe(config.merchantName);
    expect(merchant.getBearerToken()).toBe(config.bearerToken);
    expect(merchant.getEntityId()).toBe(config.entityId);
    expect(merchant.getLogoUrl()).toBe(config.logoUrl);
    expect(merchant.getLogoHeightInPx()).toBe(config.logoHeightInPx);
    expect(merchant.getLogoWidthInPx()).toBe(config.logoWidthInPx);
    expect(merchant.getPayButtonColour()).toBe(config.payButtonColour);
    expect(merchant.getPayButtonTextColour()).toBe(config.payButtonTextColour);
    expect(merchant.getBackgroundImageUrl()).toBe(config.backgroundImageUrl);
    expect(merchant.isTestMercant()).toBe(config.isTestMerchant);
    
});


test("returns merchant with correct details", async () => {
    const config: paylink.TCreateTestPayByLinkMerchant = {
        merchantName: "Tadiwanashe Shangwa",
        logoUrl: "https://kyrossports.com/wp-content/uploads/2022/10/Kyros-Logo-retina.png",
        logoHeightInPx: "50px",
        logoWidthInPx: "50px",
        payButtonColour: "#0000",
        payButtonTextColour: "#ffff",
        backgroundImageUrl: "https://images.unsplash.com/photo-1517340650606-17091f8e86ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    const merchant = paylink.createTestMerchant(config);

    expect(merchant.getMerchantName()).toBe(config.merchantName);
    expect(merchant.getLogoUrl()).toBe(config.logoUrl);
    expect(merchant.getLogoHeightInPx()).toBe(config.logoHeightInPx);
    expect(merchant.getLogoWidthInPx()).toBe(config.logoWidthInPx);
    expect(merchant.getPayButtonColour()).toBe(config.payButtonColour);
    expect(merchant.getPayButtonTextColour()).toBe(config.payButtonTextColour);
    expect(merchant.getBackgroundImageUrl()).toBe(config.backgroundImageUrl);
    expect(merchant.isTestMercant()).toBe(true);

})