
function loader() {
    window.addEventListener('load', function(e) {
        document.querySelector('.loader').classList.add("hide-loader");
        document.querySelector('.loader').classList.remove("loader");
        console.log('ready to go')
    })
}

export default loader