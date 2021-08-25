function addCart(queryId) {
    document.querySelector('.addCart').addEventListener('click', event => {
        // Vérification du produit dans le local storage
        if (!localStorage.getItem(queryId)) {
            // ajout au local storage
            localStorage.setItem(queryId, 1)
        } else {
            //Ajout d'une quantité du produit
            let keyValue = Number(localStorage.getItem(queryId))
            keyValue++
            localStorage.setItem(queryId, keyValue)
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