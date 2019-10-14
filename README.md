# Warehouse
Managing Warehouse product inventory

Please download the repo and run: node commands.js
You do not need to install any libraries.
Tests can be run exactly like in the provided EXAMPLE SESSION

> ADD WAREHOUSE 970
> ADD WAREHOUSE 45
> ADD WAREHOUSE 2

> LIST WAREHOUSES
WAREHOUSES
970
45
2

> ADD PRODUCT "Sofia Vegara 5 Piece Living Room Set" 38538505-0767-453f-89af-d11c809ebb3b
> ADD PRODUCT "BED" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
> ADD PRODUCT "TRUNK" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
ERROR ADDING PRODUCT PRODUCT with SKU 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70 ALREADY EXISTS

> LIST PRODUCTS
Sofia Vegara 5 Piece Living Room Set 38538505-0767-453f-89af-d11c809ebb3b
BED 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70

> STOCK 38538505-0767-453f-89af-d11c809ebb3b 970 1000
> LIST WAREHOUSE 970
ITEM NAME                               ITEM_SKU                              QTY
Sofia Vegara 5 Piece Living Room Set    38538505-0767-453f-89af-d11c809ebb3b  1000

