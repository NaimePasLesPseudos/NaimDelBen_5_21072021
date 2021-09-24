// Ajoute le produit dans localStorage
function addCart(product_id) {
    document.querySelector('.addCart').addEventListener('click', event => {
        
        // Vérification du produit dans le local storage
        if (!localStorage.getItem(product_id)) {
            // ajout du produit au local storage
            localStorage.setItem(product_id, 1)
        } else {
            //Ajout d'une quantité du produit
            let quantity = Number(localStorage.getItem(product_id))
            quantity++
            localStorage.setItem(product_id, quantity)
        }
        
        // Pop-up de confirmation d'ajout au panier
        if (confirm("C'est ajouté au panier ! \n\nSouhaitez-vous voir votre panier ?")) {
            window.location.assign('/pages/shopping-cart.html')
        } else {
            event.preventDefault
        }
    })
}

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

export { addCart, trashItem, subtractItem, addItem }
