var inquirer = require("inquirer");

var mysql = require("mysql");

// global variables for storing item_id and stock_quantity for later checks
var clientItem;
var clientQuantity;
var dbQuantity;
var totalCost;



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
                    type: "number",
                    message: "How many do you which to purchase?",
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

        console.log("\n you've chosen item number " + clientItem);
        console.log(" Chosen quantity " + clientQuantity);
    } else {
        console.log("Come again soon")
        connection.end()
    }


})
})
}


//this function will take the inquirer inputs and query that specific item in the sql database
// then this function will pull the stock_quantity of that queried item
// and then subtract the customer order from that items stock_quantity
// then it will return the updated number back to the database  
function getSelectedItem() {
connection.query("SELECT stock_quantity FROM products WHERE item_id =" + clientItem, function (err, res) {

//this variable is global 
dbQuantity = res

// when the item is queried above, ite returns it in an array object 
// this for loop pulls the stock_quantity from that object so it can be used
for (i = 0; i < dbQuantity.length; i++) {
// this if statment compares the database quantity against the customer request
// if the customer request is > than the database quantity it will return Insufficient quantity... and then end the connection 
// without changing any data
if(dbQuantity[i].stock_quantity < userQuantity){

    console.log("Insufficient quantity!")
    console.log("______________________________")
}else{
    getTotalCost()
    connection.query("UPDATE products SET stock_quantity = " + (dbQuantity[i].stock_quantity - userQuantity) + " WHERE item_id =" + userItem)

    
}
}
connection.end();
})
};
   

function getTotalCost() {
connection.query("SELECT price FROM products WHERE item_id =" + userItem, function (err, res) {
var price = res;
for(x = 0; x < price.length; x++){
var convert = (price[x].price * userQuantity).toFixed(2)
console.log(" total cost: $"+ convert)
console.log(" Your order has been placed")
console.log("--------------------------------------------------------")
}
})

}
            

