let methods = {};

// create warehouse class for better flexibility in the future
class Warehouse {
  constructor(number, limit = undefined) {
    this.number = number;
    this.limit = limit;
    this.products = new Map();
  }
}

// initialising the product catalog as a Map
let products = new Map();
// initialising a set of all the warehouses as a Map
let warehouses = new Map();

// function adds a new product to our product catalog.
methods.addProduct = function(name, sku) {
  // adding to the product catalog only if product sku does not exist
  if (!products.has(sku)) {
    products.set(sku, name);
  } else {
    // if product is already in the catalog throw an ERROR MESSAGE
    console.log(`ERROR ADDING PRODUCT, PRODUCT with SKU ${sku} ALREADY EXISTS`);
  }
};

// function creates a new warehouse where we can stock products
methods.addWarehouse = function(whNumber, stockLimit = undefined) {
  if (!warehouses.has(whNumber)) {
    warehouses.set(whNumber, new Warehouse(whNumber, stockLimit));
  } else {
    // if warehouse already exists throw an ERROR MESSAGE
    console.log(
      `ERROR ADDING WAREHOUSE, WAREHOUSE with WAREHOUSE# ${whNumber} ALREADY EXISTS`
    );
  }
};

// function stocks QTY amount of product with SKU in WAREHOUSE# warehouse
methods.stock = function(sku, whNumber, qty) {
  // stock only if product and warehouse both exist
  if (products.has(sku) && warehouses.has(whNumber)) {
    qty = Number(qty);
    let warehouse = warehouses.get(whNumber);
    // check if warehouse does not have stock limit
    if (!warehouse.limit) {
      // check if warehouse has the product
      if (!warehouse.products.has(sku)) {
        warehouse.products.set(sku, qty);
      } else {
        // if warehouse has the product increase the existant stock by the input quantity
        let currentProductQty = Number(warehouse.products.get(sku));
        warehouse.products.set(sku, currentProductQty + qty);
      }
    } else {
      // warehouse has stock limit
      let stockLimit = Number(warehouse.limit);
      let currentStock = 0;
      // check how much total stock the warehouse has
      for (const quantity of warehouse.products.values()) {
        currentStock += Number(quantity);
      }
      // if warehouse is fulfilled throw a message
      if (currentStock === stockLimit) {
        console.log("WAREHOUSE IS FULL");
        return;
      }
      if (!warehouse.products.has(sku)) {
        // check if additional stock will add over the stock limit
        if (currentStock + qty < stockLimit) {
          warehouse.products.set(sku, qty);
        } else {
          // stockLimit - currentStock: quantity that will keep the warehouse fulfilled
          warehouse.products.set(sku, stockLimit - currentStock);
        }
      } else {
        let currentProductQty = Number(warehouse.products.get(sku));
        if (currentStock + qty <= stockLimit) {
          warehouse.products.set(sku, currentProductQty + qty);
        } else {
          warehouse.products.set(
            sku,
            currentProductQty + stockLimit - currentStock
          );
        }
      }
    }
  } else {
    console.log(
      `ERROR STOCKING, PRODUCT WITH SKU ${sku} OR WAREHOUSE WITH WAREHOUSE# ${whNumber} DOES NOT EXIST`
    );
  }
};

// function unstocks QTY amount of product with SKU in WAREHOUSE# warehouse.
methods.unstock = function(sku, whNumber, qty) {
  if (products.has(sku) && warehouses.has(whNumber)) {
    qty = Number(qty);
    let warehouse = warehouses.get(whNumber);
    // check if warehouse has the product
    if (warehouse.products.has(sku)) {
      let currentProductQty = Number(warehouse.products.get(sku));
      // make sure that unstocking does let the current product quantity go below zero
      if (currentProductQty - qty >= 0) {
        warehouse.products.set(sku, currentProductQty - qty);
      } else {
        warehouse.products.set(sku, 0);
      }
    } else {
      console.log(
        `ERROR UNSTOCKING, PRODUCT WITH SKU ${sku} DOES NOT EXIST IN WAREHOUSE ${whNumber}`
      );
    }
  } else {
    console.log(
      `ERROR UNSTOCKING, PRODUCT WITH SKU ${sku} OR WAREHOUSE WITH WAREHOUSE# ${whNumber} DOES NOT EXIST`
    );
  }
};

// function lists all produts in the product catalog
methods.listProducts = function() {
  // iterate over the product catalog map and print out the products
  for (const [sku, name] of products.entries()) {
    console.log(name, sku);
  }
};

// function lists all warehouses
methods.listWarehouses = function() {
  console.log("WAREHOUSES");
  for (const whNumber of warehouses.keys()) {
    console.log(whNumber);
  }
};

// function lists information about the specific warehouse
methods.listWarehouse = function(whNumber) {
  if (warehouses.has(whNumber)) {
    let final = [];
    let warehouse = warehouses.get(whNumber);
    for (const [sku, qty] of warehouse.products.entries()) {
      final.push({
        "ITEM NAME": products.get(sku),
        ITEM_SKU: sku,
        QTY: qty
      });
    }
    console.table(final);
  } else {
    console.log(
      `ERROR LISTING WAREHOUSE, WAREHOUSE with WAREHOUSE# ${whNumber} DOES NOT EXISTS`
    );
  }
};

exports.data = methods;
