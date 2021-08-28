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

export { addCart }