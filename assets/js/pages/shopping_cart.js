import api from '../modules/api.mjs'
import { priceCart, superTotalPrice } from '../modules/priceCart.mjs'
import { trashItem, sustractItem, addItem } from "../modules/editCart.mjs";
import loader from '../modules/loader.mjs'

loader()

const template = document.querySelector("#cart")
    , product_item_element = document.querySelector('#cartResume')

const emailInput = document.querySelector('#email')
    , firstnameInput = document.querySelector('#firstname')
    , nameInput = document.querySelector('#name')
    , addressInput = document.querySelector('#address')
    , cityInput = document.querySelector('#city')

let productList = [],
    subtotalPrice = 0,
    contact,
    products = [],
    orderId

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

try {
    productList = await api.getProducts()
} catch (error) {
    alert(error)
}

// affichage panier produit par produit
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    let keyValue = Number(localStorage.getItem(key))

    for (const i in productList) {
        if (productList[i]._id === key) {
            const product = productList[i]
                , product_element = document.importNode(template.content, true)
                , image_element = product_element.querySelector('img')
                , title_element = product_element.querySelector('.cartTitle')
                , priceU_element = product_element.querySelector('.cartPriceU')
                , number_element = product_element.querySelector('.cartNumber')
                , priceTotal_element = product_element.querySelector('.cartPriceTotal')
                , trashItem_element = product_element.querySelector('.trash')
                , sustractQuantity_element = product_element.querySelector('.sustractQuantity')
                , addQuantity_element = product_element.querySelector('.addQuantity')
                
            image_element.setAttribute('src', product.imageUrl)
            image_element.setAttribute('alt', product.name)
            title_element.textContent = product.name
            priceU_element.textContent = product.price/100 + '€'
            number_element.textContent = keyValue
            priceTotal_element.textContent = product.price/100 * keyValue + '€'
            trashItem_element.addEventListener('click', function(){
                trashItem(key)
            })

            sustractQuantity_element.addEventListener('click', function(){
                sustractItem(key, keyValue)
            })

            addQuantity_element.addEventListener('click', function(){
                addItem(key, keyValue)
            })

            subtotalPrice += product.price * keyValue
            product_item_element.appendChild(product_element)
        }
    }
}

priceCart(subtotalPrice)

// input-warning

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

    console.log(contact, products)
    fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({contact, products})
    })
    .then(response => response.json())
    .then(json => {
        console.log(json.orderId)
        localStorage.clear();
        window.location.assign('/pages/checkout.html?order=' + json.orderId + '&price=' + superTotalPrice)
    })
    .catch(err => console.log(err))
    console.log(JSON.stringify({contact, products}))
})