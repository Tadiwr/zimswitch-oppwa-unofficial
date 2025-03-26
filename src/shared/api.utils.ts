/** Shared API Utils */

import { Merchant } from "../pay-by-link/config";

/** Returns an appropriate api host depending on whether the merchant is in test mode or live mode  */
export function getApiHost(merchant: Merchant) {
    const host = merchant.isTestMercant() ? 'eu-test.oppwa.com' : 'eu-prod.oppwa.com';
    return host;
}

/** Completes the url for the given an endpoint. Uses the merchant to determine an appropriate host, whether to use test or live host */
export function getUri(merchant: Merchant, endPoint: string) {
    const host = getApiHost(merchant);
    return `https://${host}${endPoint}`;
}

export function merchantAuthorization(merchant: Merchant) {
    return {
        "Authorization": `Bearer ${merchant.getBearerToken()}`
    }
}

/** Completes the request url like `getUri(merchant: Merchant, endpoint: string)` 
 * but also adds the merchant `entityId` request param to the request url
 * 
 * e.g `https://.../payments/{id}?entityId={merchantEntityId}` 
 * */

export function getUriWithEntityParam(merchant: Merchant, endPoint: string) {
    return `${getUri(merchant, endPoint)}?entityId=${merchant.getEntityId()}`;
}