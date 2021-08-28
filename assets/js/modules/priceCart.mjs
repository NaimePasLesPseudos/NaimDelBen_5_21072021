// calcul du panier

const subtotal_element = document.querySelector('.subtotalPrice')
    , shippingPrice_element = document.querySelector('.shippingPrice')
    , superTotalPrice_element = document.querySelector('.superTotalPrice')

let shippingPrice = 5,
    superTotalPrice = 0

function priceCart(subtotalPrice) {
    superTotalPrice = subtotalPrice + shippingPrice
    subtotal_element.textContent = 'Sous-total : ' + subtotalPrice + '€'
    shippingPrice_element.textContent = 'Frais de Port : ' + shippingPrice + '€'
    superTotalPrice_element.textContent = 'Total : ' +  superTotalPrice + '€'
}

export default priceCart
export { priceCart, shippingPrice, superTotalPrice }