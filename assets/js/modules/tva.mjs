import { shippingPrice } from "./priceCart.mjs";

// Prix TTC / (1 + taux de TVA) = Prix HT

let ht = 0,
    tva = 0.20,
    ttc = 0,
    taxe = 0

function calcTVA(superTotalPrice) {
    ht = (superTotalPrice - shippingPrice) / (1 + tva)
    taxe = superTotalPrice - ht - shippingPrice
    return taxe.toFixed(2)
}

export { calcTVA }