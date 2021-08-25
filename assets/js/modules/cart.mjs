// affichage panier produit par produit

function cartMini() {  

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
                    localStorage.removeItem(key)
                    document.location.reload()
                })
                
                sustractQuantity_element.addEventListener('click', function(){
                    keyValue--
                    if (keyValue < 1) {
                        localStorage.removeItem(key)
                    } else {
                        localStorage.setItem(key, keyValue)
                    }
                    document.location.reload()
                })
                
                addQuantity_element.addEventListener('click', function(){
                    keyValue++
                    localStorage.setItem(key, keyValue)
                    document.location.reload()
                })
                
                subtotalPrice += product.price * keyValue
                product_item_element.appendChild(product_element)
            }
        }
    }
} 

// test.addEventListener('mouseover', function(e) {

// })

export default cartMini
