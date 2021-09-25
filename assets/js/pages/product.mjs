import api from '../modules/api.mjs'
import { addCart } from '../modules/cart.mjs'

const template = document.querySelector("#product")
    , product_block_element = document.querySelector('#product_block')
    , query_id = new URLSearchParams(window.location.search.slice(1)) 

let product = {}

try {
    product = await api.getOneProduct(query_id.get("product"))
} catch (error) {
    alert(error)
}

function createTemplateProduct() {
    if (product._id === query_id.get("product")) {
        const product_element = document.importNode(template.content, true)
            , image_element = product_element.querySelector('img')
            , title_element = product_element.querySelector('.itemTitle')
            , price_element = product_element.querySelector('.itemPrice')
            , description_element = product_element.querySelector('.itemDesc')
            , color_selector_element = product_element.querySelector('.colorsList')
        
            image_element.setAttribute('src', product.imageUrl)
            image_element.setAttribute('alt', product.name)
            title_element.textContent = product.name
            price_element.textContent = product.price/100 + ' €'
            description_element.textContent = product.description
            
            product.colors.forEach(color => {
                const option = document.createElement('option')
                option.setAttribute('value', color)
                option.textContent = color
    
                color_selector_element.appendChild(option)
            })
            
            product_block_element.appendChild(product_element)
    } else {
        alert('Erreur sur le produit à afficher. \nVeuillez réessayer !')
    }
}

createTemplateProduct()
addCart(query_id.get("product"))