---
sidebar_position: 3
title: 'Algebra Layer'
---
<https://nitcbase.github.io/archived-site/algebra.html>
<https://nitcbase.github.io/archived-site/design/algebra.html>


The Front End parses SQL-Like queries and coverts them into a sequence of algebra layer and schema layer method calls.
The algebra layer functions process the basic **insert** and **retrieval** requests **to** and **from** the database.
*Retrieval functions will create a **target relation** into which the retrieved data will be stored.*

The functions of the Algebra layer are:

1. *Insert*
2. *Project*
3. *Select*
4. *Join*

The *Join* function of NITCbase supports only [Equi-Join](https://en.wikipedia.org/wiki/Join_(SQL)#Equi-join) of the two relations.

---
## Insert

#### Description
This method inserts the given record into the specified Relation. This function inserts a record into the Relation, only if the Relation is opened.
#### Arguments
 **Attribute** | **Type**          | **Description**                                                                                                                            
---------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------
 relName       | `char[ATTR_SIZE]`   | Name of the relation into which insert operation has to be performed.                                                                      
 nAttrs        | `int`               | Number of attributes in the inserting record.(which has to match with no.of attributes field in the relation cache entry for the relation) 
 record        | `char[][ATTR_SIZE]` | each string containing value of corresponding attribute.                                                                                   
#### Return values
 **Value**          | **Description**
--------------------|---------------------------------------------------------------------------------------------------------------------
 SUCCESS            | On successful insert of the given record into the relation                                                          
 E_RELNOTOPEN       | If the relation is not open.                                                                                        
 E_NATTRMISMATCH    | If the actual number of attributes in the relation is different from the provided number of attributes              
 E_ATTRTYPEMISMATCH | If the actual type of the attribute in the relation is different from the type of provided attribute in the record. 
 E_DISKFULL         | If disk space is not sufficient for inserting the record / index                                                    

---
## Select
#### Description
This function creates a new target relation with attributes as that of source relation. It inserts the records of source relation which satisfies the given condition into the Target Relation.
#### Arguments
 **Attribute** | **Type**         | **Description**                                                                                                                                                  
---------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------
 srcrel        | `char[ATTR_SIZE]`  | Name of Source Relation.                                                                                                                                         
 targetrel     | `char [ATTR_SIZE]` | Name of the target Relation                                                                                                                                      
 attr          | `char [ATTR_SIZE]` | Attribute/column name to which 'select' condition need to be checked with.                                                                                       
 op            | `int`             | Conditional Operator(can be one among EQ,LE,LT,GE,GT,NE corresponding to equal,lesthan equal, lessthan ,greaterthan equal, greaterthan, Not equal respectively). 
 strval        | `char [ATTR_SIZE]` | value of attribute.   
#### Return values
 **Value**          | **Description**                                                                                                       
--------------------|-----------------------------------------------------------------------------------------------------------------------
 SUCCESS            | On successful creation of new relation.                                                                               
 E_RELNOTOPEN       | If the source relation is not open.                                                                                   
 E_RELEXIST         | If a relation with name targetrel already exists.                                                                     
 E_ATTRNOTEXIST     | If a attribute with name attr does not exist.                                                                         
 E_ATTRTYPEMISMATCH | If the actual type of the attribute in the relation is different from the type of provided attribute.                 
 E_CACHEFULL        | If the openRel() fails because of no free slots in open relation table                                                
 E_DISKFULL         | If disk space is not sufficient for creating the new relation.                                                        
 E_INVALID          | If the relName is either "relcat" or "attrcat". i.e, when the user tries to insert a record into any of the catalogs. 

---
## Project
#### Description
This function creates a new target relation with list of Attributes specified in the arguments. For each record of the source relation, it inserts a new record into the Target relation with the attribute values corresponding to the attributes specified in the attribute list.

#### Arguments
 **Attribute** | **Type**          | **Description**                                                                                                            
---------------|-------------------|----------------------------------------------------------------------------------------------------------------------------
 srcrel        | `char[ATTR_SIZE]`   | Name of Source Relation.                                                                                                   
 targetrel     | `char [ATTR_SIZE]`  | Name of the target Relation(target relation is the Project of source Relation)                                             
 tar_nAttrs    | `int`               | No. of attributes that have to be projected from source relation to target relation.                                       
 tar_attrs     | `char[][ATTR_SIZE]` | Pointer to attribute names array, (array of attributes that have to be projected from source relation to target relation.) 

#### Return values
 **Value**       | **Description**                                                                                                       
-----------------|-----------------------------------------------------------------------------------------------------------------------
 SUCCESS         | On successful creation of new relation.                                                                               
 E_RELNOTOPEN    | If the source relation is not open.                                                                                   
 E_RELEXIST      | If a relation with name targetrel already exists.                                                                     
 E_ATTRNOTEXIST  | If any attribute with name given in attr array does not exist.                                                        
 E_DUPLICATEATTR | If two any two attributes have same name in the target relation                                                       
 E_DISKFULL      | If disk space is not sufficient for creating the new relation.                                                        
 E_CACHEFULL     | If the openRel() fails because of no free slots in open relation table                                                
 E_INVALID       | If the relName is either "relcat" or "attrcat". i.e, when the user tries to insert a record into any of the catalogs. 


---
## Join
#### Description
This function creates a new target relation with attributes constituting from both the source relations(excluding specified attribute from 2nd src relation).It inserts the records obtained by Equi-join of both the source Relations(an attribute from each Relation specified in arguments are used for equi-join) into the Target Relation.
#### Arguments
 **Attribute** | **Type**         | **Description**                   
---------------|------------------|-----------------------------------
 srcrel1       | `char[ATTR_SIZE]`  | Name of 1st Source Relation.      
 srcrel2       | `char[ATTR_SIZE]`  | Name of 2nd Source Relation.      
 targetrel     | `char [ATTR_SIZE]` | Name of the target Relation       
 attr1         | `char [ATTR_SIZE]` | Attribute/column name in srcrel1. 
 attr2         | `char [ATTR_SIZE]` | Attribute/column name in srcrel2. 


#### Return values
 **Value**          | **Description**                                                                                                       
--------------------|-----------------------------------------------------------------------------------------------------------------------
 SUCCESS            | On successful creation of new relation.                                                                               
 E_RELNOTOPEN       | If any of the source relations is not open.                                                                           
 E_RELEXIST         | If a relation with name targetrel already exists.                                                                     
 E_ATTRNOTEXIST     | If an attribute with name attr1 in srcrel1 or attr2 in srcrel2 does not exist.                                        
 E_DISKFULL         | If disk space is not sufficient for creating the new relation.                                                        
 E_ATTRTYPEMISMATCH | If the actual type of any of the attributes in the source relations is different from the type of provided attribute. 
 E_CACHEFULL        | If the openRel() fails because of no free slots in open relation table                                                

