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
    password: "yourRootpassword",
    database: "bamazon_DB"

});

connection.connect(function (err) {
    if (err) throw err;
    queryItems();
})


function queryItems {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-------------------------------");
        //loop through all the items in stock and display them
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " in stock");
            console.log("---------------------------------")
        }
    
    
    }


};