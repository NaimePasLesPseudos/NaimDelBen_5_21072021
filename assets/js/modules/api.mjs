// l'URL s'adapte selon où se lance le projet
const is_localhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    , url = is_localhost ? 'http://localhost:3000/api/teddies' : 'https://oc-p5-api.herokuapp.com/api/teddies'

// toutes les demandes API possible dans ce projet
const api = {

    // appel API pour retourner tous les produits
    async getProducts() {
        const res = await fetch(url)
        if (res.status < 200 || res.status >= 300) throw new Error(res.statusText)
        return res.json()
    },

    // appel API pour retourner le produit demandé
    async getOneProduct(id) {
        const res = await fetch(url + '/' + id)
        if (res.status < 200 || res.status >= 300) throw new Error(res.statusText)
        return res.json()
    },
    
    // Création de la commande
    async createOrder(contact, products) {
        const res = await fetch(url + '/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ contact, products })
        })

        if (res.status < 200 || res.status >= 300) throw new Error(res.statusText)

        return res.json()
    }
}

export default api
export { url }