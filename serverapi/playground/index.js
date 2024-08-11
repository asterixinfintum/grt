const sendBitcoin = require("./send.bitcoin");
const getBitcoinBalance = require("./balance.bitcoin");
const exchangePrice = require("./exhange.bitcoin");

exchangePrice()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    })

/*getBitcoinBalance("12a2txnk9ZUsHUAo1vrDvYfoZ9WQAYtYXr")
.then(result => {
    console.log(result);
})
.catch(error => {
    console.log(error);
})*/

/*sendBitcoin("bc1q32lvdvs23k4lk4ltpjh7ae2hsfy70vex664mp8", 0.00001125)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    })


//0.00001025*/

//just, immense, warfare, spot, ridge, rabbit, comfort, elite, guilt, dad, eyebrow, record