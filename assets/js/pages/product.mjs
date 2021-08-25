import api from '../modules/api.mjs'
import { addCart } from '../modules/addCart.mjs'
import loader from '../modules/loader.mjs'

loader()

const template = document.querySelector("#product")
    , product_item_element = document.querySelector('#product_item')
    , queryId = window.location.search.slice (1)

let productList = []

try {
    productList = await api.getOneProduct(queryId)
} catch (error) {
    alert(error)
}

if (productList._id === queryId) {
    const product = productList
        , product_element = document.importNode(template.content, true)
        , image_element = product_element.querySelector('img')
        , title_element = product_element.querySelector('.itemTitle')
        , price_element = product_element.querySelector('.itemPrice')
        , description_element = product_element.querySelector('.itemDesc')
    
    let colorSel = product_element.querySelector('.colorsList')
    
        image_element.setAttribute('src', product.imageUrl)
        image_element.setAttribute('alt', product.name)
        title_element.textContent = product.name
        price_element.textContent = product.price/100 + ' €'
        description_element.textContent = product.description
        
        product.colors.forEach(color => {
            colorSel.innerHTML += 
            `
            <option value="${color}" >${color}</option>
            `
        })
        
        product_item_element.appendChild(product_element)
} else {
    alert('Erreur sur le produit à afficher. \nVeuillez réessayer !')
}

addCart(queryId)