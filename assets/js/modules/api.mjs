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
    async createOrder(contact, products) {
        const res = await fetch(url + '/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({contact, products})
        })
        console.log(res)
        return res.json()
    }
}

export default api
export { url }


// fetch('http://localhost:3000/api/teddies/order', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         },
//         body: JSON.stringify({contact, products})
//     })
    // .then(response => response.json())
    // .then(json => {
    //     console.log(json.orderId)
    //     localStorage.clear();
    //     window.location.assign('/pages/checkout.html?order=' + json.orderId + '&price=' + superTotalPrice)
    // })