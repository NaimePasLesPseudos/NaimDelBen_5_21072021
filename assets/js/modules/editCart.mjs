// Supprime le produit du LocalStorage
function trashItem(product_id) {
    localStorage.removeItem(product_id)
}

// Soustrait de un la quantité de produit du LocalStorage
function subtractItem(product_id, quantity) {
    quantity--
    if (quantity < 1) {
        trashItem(product_id)
    } else {
        localStorage.setItem(product_id, quantity)
    }
    
    return quantity
}

// Ajoute de un la quantité de produit du LocalStorage
function addItem(product_id, quantity) {
    quantity++
    localStorage.setItem(product_id, quantity)

    return quantity
}

export default trashItem
export { trashItem, subtractItem, addItem }
