import { dateShipping } from "../modules/shipping.mjs";
import { calcTVA } from "../modules/tva.mjs";
import loader from '../modules/loader.mjs'

loader()

const url = window.location

const textCheckout = document.querySelector('#textCheckout')
    , orderCheckout = document.querySelector('#orderCheckout')
    , priceCheckout = document.querySelector('#priceCheckout')
    , TVACheckout = document.querySelector('#TVACheckout')
    , shippingCheckout = document.querySelector('#shippingCheckout')

const orderParams = new URLSearchParams(url.search.substring(1))
    , orderId = orderParams.get('order')
    , priceOrder = orderParams.get('price')

// vérification des informations de confirmation
if (orderId === null || priceOrder === null) {
    textCheckout.textContent = 'Votre panier est vide !'
} else {
    textCheckout.innerHTML = 
                            `
                            Merci pour la commande ! <br>
                            Voici votre numéro de commande :
                            `
    orderCheckout.textContent = orderId
    priceCheckout.textContent = priceOrder + ' €'
    TVACheckout.textContent = '(dont TVA à 20% : ' + calcTVA(priceOrder) + ' €)'
    shippingCheckout.textContent = 'Votre commande sera livrée vers le : ' + dateShipping.toLocaleString()
}