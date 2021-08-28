import api from '../modules/api.mjs'

const shoppingCart = document.querySelector('.shoppingCart')

let products = []

try {
    products = await api.getProducts()
} catch (error) {
    alert(error)
}

console.log(shoppingCart)

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        let keyValue = Number(localStorage.getItem(key))
        
        for (const i in products) {
            if (products[i]._id === key) {
                const product = products[i]
                console.log(products[i])

            }
        }
    }

export default shoppingCart
