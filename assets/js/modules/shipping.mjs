const dateToday = new Date()
    , dateFuture = new Date()
    
dateFuture.setDate(dateToday.getDate() + 10)

const dateShipping = dateFuture.toDateString()
    
export { dateShipping }