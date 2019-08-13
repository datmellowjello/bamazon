var inquirer = require("inquirer");

var mysql = require("mysql");

var clientItem;
var clientQuantity;
var dbQuantity;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "bamazon_DB"

});

connection.connect(function (err) {
    if (err) throw err;
    queryItems();
})

function queryItems () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-------------------------------");
        //loop through all the items in stock and display them
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " in stock");
            console.log("---------------------------------")
        }
    
    
        console.log("-----------------------------------");

        // inquirer prompt
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What products would you like to buy?",
                    name: "id"
                },
                {
                    type: "input",
                    message: "How many do you want to purchase?",
                    name: 'quantity'
                },
                {
                    type: "confirm",
                    message: "Are you sure you want to buy the products?",
                    name: "confirm",
                    default: true
                }
            ])
   //  .then function
   .then(function (inquirerResponse) {


    if (inquirerResponse.confirm) {
        clientItem = inquirerResponse.id
        clientQuantity = inquirerResponse.quantity
        
        getSelectedItem()

        console.log("\n you've chosen " + clientItem);
        console.log(" Chosen quantity " + clientQuantity);
    } else {
        console.log("come back soon!")
        connection.end()
    }


})
})
}


function getSelectedItem() {
connection.query("SELECT stock_quantity FROM products WHERE item_id =" + clientItem, function (err, res) {

dbQuantity = res
for (i = 0; i < dbQuantity; i++) {

if(dbQuantity[i].stock_quantity < clientQuantity){

    console.log("Insufficient quantity!")
    console.log("______________________________")
}else{
    getTotalCost();
    connection.query("UPDATE products SET stock_quantity = " + (dbQuantity[i].stock_quantity - clientQuantity) + " WHERE item_id =" + clientItem)

    
}
}
connection.end();
})
};
   

function getTotalCost() {
connection.query("SELECT price FROM products WHERE item_id =" + clientItem, function (err, res) {
var price = res;
for(x = 0; x < price.length; x++){
var convert = (price[x].price * clientQuantity).toFixed(2)
console.log(" total cost: $"+ convert)
console.log(" Your order has been placed")
console.log("--------------------------------------------------------")
}
})

}
            

