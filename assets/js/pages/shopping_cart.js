import api from '../modules/api.mjs'
import { trashItem, subtractItem, addItem } from "../modules/cart.mjs"

const subtotal_element = document.querySelector('#subtotalPrice .value')
    , shippingPrice_element = document.querySelector('#shippingPrice .value')
    , totalPrice_element = document.querySelector('#totalPrice .value')
    , template_product_row = document.querySelector("#product_row")
    , product_item_element = document.querySelector('#cartResume')
    , emailInput = document.querySelector('#email')
    , firstnameInput = document.querySelector('#firstname')
    , nameInput = document.querySelector('#name')
    , addressInput = document.querySelector('#address')
    , cityInput = document.querySelector('#city')
    , shippingPrice = 5
    , cart = {}

let totalPrice = 0

// Construction du panier avec les produits du local storage
const buildCart = (productList) => {
    for (let i = 0; i < localStorage.length; i++) {
        const product_id = localStorage.key(i)
            , quantity = Number(localStorage.getItem(product_id))
            , product = productList.find(p => p._id === product_id)
            , total = 0

        if (!product) continue

        cart[product_id] = { ...product, quantity, total }
        buildProductRow(cart[product_id])
    }

    buildCartPrice()
}

// Construction des prix totaux
const buildCartPrice = () => {
    const subTotalPrice = Object.values(cart).reduce((subTotal, product) => subTotal + product.price / 100 * product.quantity, 0)

    subtotal_element.textContent = subTotalPrice
    shippingPrice_element.textContent = shippingPrice
    totalPrice = subTotalPrice + shippingPrice
    totalPrice_element.textContent = totalPrice
}


// Construction pour l'affichage d'une ligne/produit
const buildProductRow = product => {
    const product_element = document.importNode(template_product_row.content, true).querySelector('article')
    , image_element = product_element.querySelector('img')
    , title_element = product_element.querySelector('.cartTitle')
    , priceU_element = product_element.querySelector('.cartPriceU .value')
    , number_element = product_element.querySelector('.cartNumber')
    , priceTotal_element = product_element.querySelector('.priceTotal .value')
    , trashItem_element = product_element.querySelector('.trash')
    , subtractQuantity_element = product_element.querySelector('.subtractQuantity')
    , addQuantity_element = product_element.querySelector('.addQuantity')
    , price = product.price / 100
    
    product.total = price * product.quantity
    
    image_element.setAttribute('src', product.imageUrl)
    image_element.setAttribute('alt', product.name)
    title_element.textContent = product.name
    priceU_element.textContent = price
    number_element.textContent = product.quantity
    priceTotal_element.textContent = product.total
    
    trashItem_element.addEventListener('click', function(){
        trashItem(product._id)
        product_element.remove()
        delete cart[product._id]
        buildCartPrice()
    })
    
    product_item_element.appendChild(product_element)
    
    subtractQuantity_element.addEventListener('click', function(){
        if (product.quantity === 1) return
        product.quantity = subtractItem(product._id, product.quantity)
        product.total = price * product.quantity
        number_element.textContent = product.quantity
        priceTotal_element.textContent = product.total
        buildCartPrice()
    })
    
    addQuantity_element.addEventListener('click', function(){
        product.quantity = addItem(product._id, product.quantity)
        product.total = price * product.quantity
        number_element.textContent = product.quantity
        priceTotal_element.textContent = product.total
        buildCartPrice()
    })

    document.querySelector('#formCheckout').classList.remove('hidden')
    document.querySelector('.emptyCart').classList.add('hidden')
}

try {
    let productList = await api.getProducts()
    buildCart(productList)
} catch (error) {
    alert(error)
}

// Vérification informations clients
const setFieldMessage = (inputField, msg, boolean) => {
    const input = document.querySelector(`#${inputField}`)
    const messageEl = document.querySelector(`#${inputField}.message`)
    input.classList.toggle('text-bold', boolean)
    messageEl.textContent = msg
}

const resetField = (inputField) => {
    const input = document.querySelector(`#${inputField}`)
    const messageEl = document.querySelector(`.${inputField}-field .message`)
    setFieldMessage(inputField, '', false)
}

// Vérification email
emailInput.addEventListener('blur', function (event) {
    const eventValue = emailInput.value
    const eventRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValidEvent = eventRegex.test(eventValue)

    if (!isValidEvent) setFieldMessage('email','Votre email semble incorrect', true)
})

// Vérification prénom
firstnameInput.addEventListener('blur', function (event) {
    const eventValue = firstnameInput.value
    const eventRegex = /(?:[A-Z][a-z.-]+[ ]?)+/i
    const isValidEvent = eventRegex.test(eventValue)

    if (!isValidEvent) setFieldMessage('firstname','Votre prénom semble incorrect', true)
})

// Vérification nom
nameInput.addEventListener('blur', function (event) {
    const eventValue = nameInput.value
    const eventRegex = /(?:[A-Z][a-z.-]+[ ]?)+/i
    const isValidEvent = eventRegex.test(eventValue)

    if (!isValidEvent) setFieldMessage('name','Votre nom semble incorrect', true)
})

// Vérification addresse
addressInput.addEventListener('blur', function (event) {
    const eventValue = addressInput.value
    const eventRegex = /(?:[0-9]+[ ]+[A-Z][a-z.-]+[ ]?)+/i
    const isValidEvent = eventRegex.test(eventValue)

    if (!isValidEvent) setFieldMessage('address','Votre adresse semble incorrect', true)
})

// Vérification ville
cityInput.addEventListener('blur', function (event) {
    const eventValue = cityInput.value
    const eventRegex = /(?:[A-Z][a-z.-]+[ ]?)+/i
    const isValidEvent = eventRegex.test(eventValue)

    if (!isValidEvent) {
        setFieldMessage('city','Votre ville semble incorrect', true)
    }
})

// remise à zéro du champs du formulaire concerné
emailInput.addEventListener('focus', () => resetField('email'))
firstnameInput.addEventListener('focus', () => resetField('firstname'))
nameInput.addEventListener('focus', () => resetField('name'))
addressInput.addEventListener('focus', () => resetField('address'))
cityInput.addEventListener('focus', () => resetField('city'))

// Validation de la commande
document.querySelector('#formCheckout').addEventListener('submit', async function(event){
    event.preventDefault()

    // Stocker les informations importantes pour le serveur et envoi API
    const products = Object.keys(cart)
        , contact = {
            firstName: firstnameInput.value,
            lastName: nameInput.value,
            email: emailInput.value,
            address: addressInput.value,
            city: cityInput.value,
        }

    try {
        const { orderId } = await api.createOrder(contact, products)
        localStorage.clear()
        localStorage.setItem('checkout', JSON.stringify({ orderId, cart, contact, totalPrice }))
        window.location.assign('./checkout.html')
    } catch (error) {
        alert(error)
    }
})