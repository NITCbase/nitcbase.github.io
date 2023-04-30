echo
echo ----Creating four new relations----
CREATE TABLE Products(id NUM, name STR, cost NUM, stock NUM, color STR)
CREATE TABLE Sales(id NUM, storeId NUM, productId NUM, purchaser STR, discount NUM, billId NUM)
CREATE TABLE Bills(id NUM, totalCost NUM, tax NUM, tip NUM)
CREATE TABLE Stores(id NUM, name STR, owner STR, location STR, startDate STR)
echo
echo ----Relation Catalog entries of new relations----
echo - TODO:confirm that all the relations are printed
echo
SELECT * FROM RELATIONCAT INTO null WHERE RelName=Products
SELECT * FROM RELATIONCAT INTO null WHERE RelName=Bills
SELECT * FROM RELATIONCAT INTO null WHERE RelName=Sales
SELECT * FROM RELATIONCAT INTO null WHERE RelName=Stores
echo ---------------------------------------------
echo
echo ----Attribute Catalog entries of new relations----
echo - TODO:check if all the attributes are printed
echo
SELECT * FROM ATTRIBUTECAT INTO null WHERE RelName=Products
SELECT * FROM ATTRIBUTECAT INTO null WHERE RelName=Sales
SELECT * FROM ATTRIBUTECAT INTO null WHERE RelName=Bills
SELECT * FROM ATTRIBUTECAT INTO null WHERE RelName=Stores
echo --------------------------------------------------
echo
echo ----Opening new relations----
OPEN TABLE Products
OPEN TABLE Stores
echo -----------------------------
echo
echo ----Populating new relations----
INSERT INTO Products VALUES FROM s8products.csv
INSERT INTO Stores VALUES FROM s8stores.csv
echo --------------------------------
echo
echo ----Selecting from new relation----
SELECT * FROM Stores INTO null WHERE owner=Gomez
echo -----------------------------------
echo
echo ----Deleting Products, Sales, Bills----
CLOSE TABLE Products
DROP TABLE Products
DROP TABLE Sales
DROP TABLE Bills
echo ------------------------------
echo
echo ----Printing the relation catalog entries again----
echo - TODO:confirm that no entries are printed
echo
SELECT * FROM RELATIONCAT INTO null WHERE RelName=Products
SELECT * FROM RELATIONCAT INTO null WHERE RelName=Bills
SELECT * FROM RELATIONCAT INTO null WHERE RelName=Sales
echo Done