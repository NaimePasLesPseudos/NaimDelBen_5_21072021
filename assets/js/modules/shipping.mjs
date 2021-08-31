let dateToday = new Date(),
    dateFuture = new Date()
    
    
dateFuture.setDate(dateToday.getDate() + 10)

let dateShipping = dateFuture.toDateString()
    

console.log(dateShipping)

export { dateShipping }