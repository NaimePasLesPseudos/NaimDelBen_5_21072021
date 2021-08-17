// obtention du paramètre d'URL

let queryId = window.location.search.slice (1);

// récupération donnée du produit dans l'API

let url = 'https://oc-p5-api.herokuapp.com/api/teddies'
    
// let url = 
//     location.hostname === 'localhost' || location.hostname === '127.0.0.1'
//     ? 'http://localhost:3000/api/teddies' : 'https://oc-p5-api.herokuapp.com/api/teddies'

fetch(url)
.then(res => res.json())
.then(data => {
    for (let i in data) {
        if (data[i]._id === queryId) {
            document.getElementById("product").innerHTML = 
            `
            <img class="productImg" src="${data[i].imageUrl}" alt="">
            <div class="mx-10">
            <div class="flex justify-between align-items-center">
                <h2>${data[i].name}</h2>
                <h2>${data[i].price} €</h2>
            </div>
    
            <p> 
            ${data[i].description}
            </p>
            `;

            let colorsList = document.getElementById("colorsList");
            document.getElementById("colorsList").innerHTML = "";
            data[i].colors.forEach(arrColor => {
                console.log(arrColor);
                let seloptions = document.createElement("option");
                seloptions.innerHTML = arrColor;
                seloptions.value = arrColor;
                colorsList.appendChild(seloptions);
            });
        }
    }
})
  