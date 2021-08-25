
function trashItem(key) {
    localStorage.removeItem(key)
    document.location.reload()
}

function sustractItem(key, keyValue) {
    keyValue--
    if (keyValue < 1) {
        localStorage.removeItem(key)
    } else {
        localStorage.setItem(key, keyValue)
    }
    document.location.reload()
}

function addItem(key, keyValue) {
    keyValue++
    localStorage.setItem(key, keyValue)
    document.location.reload()
}

export default trashItem
export { trashItem, sustractItem, addItem }



