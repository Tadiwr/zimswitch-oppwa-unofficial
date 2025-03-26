import { test, expect, it } from "vitest";
import * as paylink from "../../src/pay-by-link";
import { getApiHost, getUri, getUriWithEntityParam, LIVE_HOST, merchantAuthorization, TEST_HOST } from "../../src/shared/api.utils";
import { describe } from "node:test";

describe("tests getApiHost", () => {


    it("returns the test host when merchant is test merchant", () => {
        const merchant = new paylink.Merchant({
            merchantName: "Test Merchant",
            bearerToken: "RANDOM_BEARER_TOKEN",
            entityId: "RANDOM_ENTITY_ID",
            isTestMerchant: true
        });

        expect(getApiHost(merchant)).toBe(TEST_HOST);
    });

    it("returns the live host when merchant is not test merchant", () => {
        const merchant = new paylink.Merchant({
            merchantName: "Test Merchant",
            bearerToken: "RANDOM_BEARER_TOKEN",
            entityId: "RANDOM_ENTITY_ID"
        });

        expect(getApiHost(merchant)).toBe(LIVE_HOST);
    })

});


describe("test get uri for test merchant", () => {

    const merchant = new paylink.Merchant({
        merchantName: "Test Merchant",
        bearerToken: "RANDOM_BEARER_TOKEN",
        entityId: "RANDOM_ENTITY_ID",
        isTestMerchant: true
    });

    it("completes the url for merchant in test env", () => {
        const endPoint = "/some_endpoint";
        
        expect(getUri(merchant, endPoint)).toBe(
            `https://${TEST_HOST}${endPoint}`
        );

        expect(getUriWithEntityParam(merchant, endPoint)).toBe(
            `https://${TEST_HOST}${endPoint}?entityId=${merchant.getEntityId()}`
        );
    })
})


describe("test get uri for live prod merchant", () => {

    const merchant = new paylink.Merchant({
        merchantName: "Test Merchant",
        bearerToken: "RANDOM_BEARER_TOKEN",
        entityId: "RANDOM_ENTITY_ID"
    });

    it("completes the url for merchant in live env", () => {
        const endPoint = "/some_endpoint";
        
        expect(getUri(merchant, endPoint)).toBe(
            `https://${LIVE_HOST}${endPoint}`
        );
    })

    it("completes the url for merchant in live env with entity id", () => {
        const endPoint = "/some_endpoint";
        
        expect(getUriWithEntityParam(merchant, endPoint)).toBe(
            `https://${LIVE_HOST}${endPoint}?entityId=${merchant.getEntityId()}`
        );
    })
});

describe("tests merchant authorization header", () => {
    it("constructs correct header with merchant bearer token", () => {
        const merchant = new paylink.Merchant({
            merchantName: "Live Dummy Merchant",
            bearerToken: "SOME_BEARER_TOKEN",
            entityId: "SOME_ENTITY_ID"
        });

        expect(merchantAuthorization(merchant)).toEqual({
            Authorization: "Bearer " + merchant.getBearerToken()
        });
    });
});

