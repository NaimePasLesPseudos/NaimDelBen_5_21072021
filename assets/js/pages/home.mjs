import api from '../modules/api.mjs'

const template = document.querySelector("#product_item")
    , product_list_element = document.querySelector('#product_list')

let productList = []

try {
    productList = await api.getProducts()
} catch (error) {
    alert(error)
}

productList.forEach(product => {
    const product_element = document.importNode(template.content, true)
        , image_element = product_element.querySelector('img')
        , title_element = product_element.querySelector('.listTitle')
        , link_element = product_element.querySelector('a')

    image_element.setAttribute('src', product.imageUrl)
    image_element.setAttribute('alt', product.name)
    link_element.setAttribute('href', link_element.href + product._id)
    title_element.textContent = product.name

    product_list_element.appendChild(product_element)
})