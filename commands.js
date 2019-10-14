// this file reads user input and processes commands

let myStore = require("./store.js");

let readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let waitInput = function() {
  rl.question("> ", function(input) {
    let commands = input.split(" ");

    // Processing the commands
    if (commands[0] === "exit()") {
      // closing REPL by typing exit()
      rl.close();
    } else if (commands[0] === "ADD") {
      if (commands[1] === "PRODUCT") {
        // getting the name of the product from the string
        let index1 = input.indexOf('"');
        let index2 = input.lastIndexOf('"');
        let name = input.substring(index1 + 1, index2);
        // getting the sku of the product from the string without quotes
        let sku = input.substring(index2 + 2);
        myStore.data.addProduct(name, sku);
        waitInput();
      } else if (commands[1] === "WAREHOUSE") {
        if (commands.length === 4) {
          myStore.data.addWarehouse(commands[2], commands[3]);
          waitInput();
        } else {
          myStore.data.addWarehouse(commands[2]);
          waitInput();
        }
      }
    } else if (commands[0] === "STOCK") {
      myStore.data.stock(commands[1], commands[2], commands[3]);
      waitInput();
    } else if (commands[0] === "UNSTOCK") {
      myStore.data.unstock(commands[1], commands[2], commands[3]);
      waitInput();
    } else if (commands[0] === "LIST") {
      if (commands[1] === "PRODUCTS") {
        myStore.data.listProducts();
        waitInput();
      } else if (commands[1] === "WAREHOUSES") {
        myStore.data.listWarehouses();
        waitInput();
      } else if (commands[1] === "WAREHOUSE") {
        myStore.data.listWarehouse(commands[2]);
        waitInput();
      }
    }
  });
};

waitInput();
