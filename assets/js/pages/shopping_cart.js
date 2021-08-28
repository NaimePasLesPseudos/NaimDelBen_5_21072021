import api from '../modules/api.mjs'
import { priceCart, superTotalPrice } from '../modules/priceCart.mjs'
import { trashItem, subtractItem, addItem } from "../modules/editCart.mjs";

const emailInput = document.querySelector('#email')
    , firstnameInput = document.querySelector('#firstname')
    , nameInput = document.querySelector('#name')
    , addressInput = document.querySelector('#address')
    , cityInput = document.querySelector('#city')

let contact,
    products = []


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

const cart = {}
    , template = document.querySelector("#product_row")
    , product_item_element = document.querySelector('#cartResume')

let productList = [],
    subtotalPrice = 0

const buildCart = product => {
    const product_element = document.importNode(template.content, true).querySelector('article')
        , image_element = product_element.querySelector('img')
        , title_element = product_element.querySelector('.cartTitle')
        , priceU_element = product_element.querySelector('.cartPriceU')
        , number_element = product_element.querySelector('.cartNumber')
        , priceTotal_element = product_element.querySelector('.cartPriceTotal')
        , trashItem_element = product_element.querySelector('.trash')
        , sustractQuantity_element = product_element.querySelector('.sustractQuantity')
        , addQuantity_element = product_element.querySelector('.addQuantity')

    product.total = product.price/100 * product.quantity
    
    image_element.setAttribute('src', product.imageUrl)
    image_element.setAttribute('alt', product.name)
    title_element.textContent = product.name
    priceU_element.textContent = product.price/100 + '€'
    number_element.textContent = product.quantity
    priceTotal_element.textContent = product.total + ' €'
    
    trashItem_element.addEventListener('click', function(){
        trashItem(product._id)
        product_element.remove()
    })
    
    sustractQuantity_element.addEventListener('click', function(){
        product.quantity = subtractItem(product._id, product.quantity)
        if (product.quantity < 1) {
        product_element.remove()
        }
        number_element.textContent = product.quantity
        product.total = product.price/100 * product.quantity
        priceTotal_element.textContent = product.total + ' €'
    })
    
    addQuantity_element.addEventListener('click', function(){
        product.quantity = addItem(product._id, product.quantity)
        number_element.textContent = product.quantity
        product.total = product.price/100 * product.quantity
        priceTotal_element.textContent = product.total + ' €'
    })
    
    console.log(product.total)
    
    subtotalPrice += product.total
    console.log(subtotalPrice)
    product_item_element.appendChild(product_element)
    priceCart(subtotalPrice)
    document.querySelector('#formCheckout').classList.remove('hidden')
    document.querySelector('.emptyCart').classList.add('hidden')
}

try {
    productList = await api.getProducts()
} catch (error) {
    alert(error)
}

for (let i = 0; i < localStorage.length; i++) {
    const product_id = localStorage.key(i)
        , quantity = Number(localStorage.getItem(product_id))
        , product = productList.find(p => p._id === product_id)
        , total = 0

    if (!product) continue

    cart[product_id] = { ...product, quantity, total }
    buildCart(cart[product_id])
}

// Vérification informations clients
// Vérification email
emailInput.addEventListener('blur', function (event) {
    const eventValue = emailInput.value
    const eventRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValidEvent = eventRegex.test(eventValue)
  
    if (!isValidEvent) {
        setFieldMessage('email','Votre email semble incorrect', true)
    }
})

emailInput.addEventListener('focus', () => {
    resetField('email')
})

// Vérification prénom
firstnameInput.addEventListener('blur', function (event) {
    const eventValue = firstnameInput.value
    const eventRegex = /(?:[A-Z][a-z.-]+[ ]?)+/i
    const isValidEvent = eventRegex.test(eventValue)
  
    if (!isValidEvent) {
        setFieldMessage('firstname','Votre prénom semble incorrect', true)
    }
})

firstnameInput.addEventListener('focus', () => {
    resetField('firstname')
})

// Vérification nom
nameInput.addEventListener('blur', function (event) {
    const eventValue = nameInput.value
    const eventRegex = /(?:[A-Z][a-z.-]+[ ]?)+/i
    const isValidEvent = eventRegex.test(eventValue)
  
    if (!isValidEvent) {
        setFieldMessage('name','Votre nom semble incorrect', true)
    }
})

nameInput.addEventListener('focus', () => {
    resetField('name')
})

// Vérification addresse
addressInput.addEventListener('blur', function (event) {
    const eventValue = addressInput.value
    const eventRegex = /(?:[0-9]+[ ]+[A-Z][a-z.-]+[ ]?)+/i
    const isValidEvent = eventRegex.test(eventValue)
  
    if (!isValidEvent) {
        setFieldMessage('address','Votre adresse semble incorrect', true)
    }
})

addressInput.addEventListener('focus', () => {
    resetField('address')
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

cityInput.addEventListener('focus', () => {
    resetField('city')
})

document.querySelector('#btnForm').addEventListener('click', function(event){
    event.preventDefault()
    contact = {
        firstName: firstnameInput.value,
        lastName: nameInput.value,
        email: emailInput.value,
        address: addressInput.value,
        city: cityInput.value,
    }
    
    for (let i = 0; i < localStorage.length; i++) {
        const cle = localStorage.key(i)
            , valeur = localStorage.getItem(cle) * 1
        
        for (let j = 0; j < valeur; j++) {
            products.push(cle)
        }
    }

    try {
        localStorage.clear();
        let res = api.createOrder(contact, products)
        .then (res => 
            localStorage.setItem('checkout', JSON.stringify(res))
        )
        window.location.assign('/pages/checkout.html')
        
    } catch (error) {
        alert(error)
    }
})
