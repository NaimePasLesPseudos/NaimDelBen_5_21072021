const is_localhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    , url = is_localhost ? 'http://localhost:3000/api/teddies' : 'https://oc-p5-api.herokuapp.com/api/teddies'

const api = {
    async getProducts() {
        const res = await fetch(url)
        return res.json()
    },
    async getOneProduct(id) {
        const res = await fetch(url + '/' + id)
        return res.json()
    },
    async createOrder() {

    }
}

export default api
export { url }