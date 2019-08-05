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

            

