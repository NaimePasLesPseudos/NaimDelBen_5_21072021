import { dateShipping } from "../modules/shipping.mjs";

const textCheckout = document.querySelector('#textCheckout')
    , orderCheckout = document.querySelector('#orderCheckout')
    , shippingCheckout = document.querySelector('#shippingCheckout')
    , outCheckout = document.querySelector('#outCheckout')

let checkoutJSON = localStorage.getItem('checkout')
let checkout = JSON.parse(checkoutJSON)

console.log(checkout)

// vérification des informations de confirmation
if (checkout === null) {
    textCheckout.textContent = 'Pas de commande car votre panier est vide !'
} else {
    textCheckout.textContent = 'Votre commande à bien été validé ' + checkout.contact.firstName + ' ' + checkout.contact.lastName + ' !'
    orderCheckout.textContent = 'Voici votre numéro de commande : ' + checkout.orderId
    shippingCheckout.textContent = 'Votre commande sera livrée vers le : ' + dateShipping.toLocaleString()
    outCheckout.textContent = 'Retrouvez votre commande à l\'e-mail suivant : ' + checkout.contact.email + ' ' + 'Merci pour votre confiance ! À bientôt.'
    localStorage.clear()
}
