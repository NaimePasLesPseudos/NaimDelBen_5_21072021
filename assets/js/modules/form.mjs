const emailInput = document.querySelector('#email')
    , firstnameInput = document.querySelector('#firstname')
    , nameInput = document.querySelector('#name')
    , addressInput = document.querySelector('#address')
    , cityInput = document.querySelector('#city')

let contact

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
        // window.location.assign('/pages/checkout.html?order=' + res.orderId + '&price=' + superTotalPrice)
        

    } catch (error) {
        alert(error)
    }
})
