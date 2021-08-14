// URL de l'API

let url = 
    location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/teddies' : 'https://oc-p5-api.herokuapp.com/api/teddies'

// Appel API et affichage des produits

fetch(url)
.then(res => res.json())
.then(data => {
    for (let article of data)
            document.getElementById("list").innerHTML += 
                `
                <article class="list">
                <img src=${article.imageUrl} alt="teddy 1">
                <div class="listProduct flex flex-col">
                <h1 class="listTitle">${article.name}</h1>
                <a href="./pages/product.html?${article._id}">
                <button class="btn btn--list">
                Je le veux
                </button>
                </a>
                </div>
                </article>
                `;
})
