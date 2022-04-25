---
sidebar_position: 3
title: 'Algebra Layer'
---
<https://nitcbase.github.io/archived-site/algebra.html>
<https://nitcbase.github.io/archived-site/design/algebra.html>

## Layout

The Front End parses SQL-Like queries and coverts them into a sequence of algebra layer and schema layer method calls.
The algebra layer functions process the basic **insert** and **retrieval** requests **to** and **from** the database.
*Retrieval functions will create a **target relation** into which the retrieved data will be stored.*

The functions of the Algebra layer are:
1. *Insert*
2. *Project*
3. *Select*
4. *Join*

The *Join* function of NITCbase supports only [Equi-Join](https://en.wikipedia.org/wiki/Join_(SQL)#Equi-join) of the two relations.

NITCbase follows an Object-Oriented design for Algebra Layer. The class definition is as shown below.


## class Algebra
```cpp

class Algebra {
public:
    static int insert(char* relName, int nAttrs, char** record);

    static int select(char* srcRel, char* targetRel, char** attr, int op, char* strVal);

    static int project(char* srcRel, char* targetRel, int tar_nAttrs, char** tar_Attrs);

    static int join(char* srcRelOne, char* srcRelTwo, char* targetRel, char* attrOne, char* attrTwo);
};


```

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
 E_INVALID          | If relName is either "RELATIONCAT" or "ATTRIBUTECAT". i.e, when the user tries to insert a record into any of the catalogs.                                                  
#### Algorithm
```cpp
int insert(char relName[ATTR_SIZE], int nAttrs, char record[][ATTR_SIZE]){
// if relName is equal to "RELATIONCAT" or "ATTRIBUTECAT"
	// return E_INVALID;

	// if relation is not open in open relation table, return E_RELNOTOPEN
	// (check if the value returned from getRelId function call = E_RELNOTOPEN)

	// get the relation catalog entry from relation cache
	// (use RelCacheTable::getRelCatEntry() of Cache Layer)
	
	// if relCatEntry.numAttrs != numberOfAttributes in relation, return E_NATTRMISMATCH

	// let recordValues[numberOfAttributes] be an array of type union Attribute

	/*
	    Converting 2D char array of record values to Attribute array recordValues
	 */
	// iterate through 0 to nAttrs-1: (let i be the iterator)
	{
		// get the attribute catalog entry for the i'th attribute from the attribute cache
		// (use AttrCacheTable::getAttrCatEntry() function with arguments relId and i)

		// let type = attrCatEntry.attrType;

		if (type == NUMBER)
		{
			// if the char array record[i] can be converted to a number
			// (check this using checkAttrTypeOfValue() function)
			{
				// convert the char array to numeral and store it at recordValues[i].nVal
			}
			// else 
			{
				return E_ATTRTYPEMISMATCH;
			}
		}
		else if (type == STRING)
		{
			// iterate through 0 to ATTR_SIZE-1: (let charIndex be the iterator)
			{
				// let ch be the character at index (i, charIndex) of record array

				// if ch == null character(i.e. '\0') exit the loop
				
				// if ch is an invalid character return E_INVALID;
				// (check this using checkIfInvalidCharacter() function)
			}
			// copy record[i] to recordValues[i].sVal
		}
	}

	// insert the record by calling BlockAccess::ba_insert() function of Block Access Layer
	// let retVal denote the return value of ba_insert call

	return retVal;        
}
```

---
## Select
#### Description
This function creates a new target relation with attributes as that of source relation. It inserts the records of source relation which satisfies the given condition into the Target Relation.
#### Arguments
 **Attribute** | **Type**         | **Description**                                                                                                                                                  
---------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------
 srcRel        | `char[ATTR_SIZE]`  | Name of Source Relation.                                                                                                                                         
 targetRel     | `char [ATTR_SIZE]` | Name of the target Relation                                                                                                                                      
 attr          | `char [ATTR_SIZE]` | Attribute/column name to which 'select' condition need to be checked with.                                                                                       
 op            | `int`             | Conditional Operator(can be one among EQ,LE,LT,GE,GT,NE corresponding to equal,lesthan equal, lessthan ,greaterthan equal, greaterthan, Not equal respectively). 
 strVal        | `char [ATTR_SIZE]` | value of attribute.   
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
#### Algorithm
```cpp
int select(char srcRel[ATTR_SIZE],char targetRel[ATTR_SIZE], char attr[ATTR_SIZE], int op, char strVal[ATTR_SIZE]){

    // get the srcrel's open relation id(let it be srcrelid), using getRelId() method of cache layer
    // if srcrel is not open in open relation table, return E_RELNOTOPEN

    // get the attribute catalog entry for attr, using getAttrcatEntry() method of cache layer(let it be attrcatentry).
    // if getAttrcatEntry() call fails return E_ATTRNOTEXIST

    //convert strval into union Attribute (let it be val) as shown in the following code:
    // let type=attrcatentry.attr_type;
    if(type==INT){  
        //The input contains a string representation of the integer attribute value.
        val.ival=atoi(attr[iter]);
        //if conversion fails(i.e string can not be converted to integer) return E_ATTRTYPEMISMATCH. 
    }else if(type==FLOAT){
        //do accordingly to float
    }else if(type==STRING){
        //No type conversion needed here.
    }
    //if convert fails, return E_ATTRTYPEMISMATCH

    //Next task is to create the destination relation.
    //Prepare arguments for createRel() in the following way:
    //get RelcatEntry of srcrel from cache using getRelCatEntry() method of cache layer.
    //get the no. of attributes present in src relation, from RelcatEntry.(let it be nAttrs)

    // let attr_name[nAttrs][ATTR_SIZE] be a 2D array of type char(attribute names of rel).
    // let attr_types[nAttrs] be an array of type int

    /*iterate through 0 to nAttrs-1 :
        get the i'th attribute's AttrCatEntry (using getAttrcatEntry() of cache layer )
        fill attr_name, attr_types of corresponding attributes using Attribute catalog found.
    */

    /* let retval= createRel(targetrel,no_of_attrs_srcrel,attr_name,attr_type)
       where createrel is a function in schema layer
       if create fails return retval */

    //int targetrelid = openRel(targetrel) 
    //where openRel is a function in schema layer
    /* if open fails
        delete target relation by calling deleteRel(targetrel) of schema layer
        return retval
    */
    
    //Note: Before calling the search function, reset the search to start from the first hit
    // by calling ba_search of block access layer with op=RST.
    /*
    while (1):
        var: union Attribute record[no_of_attrs_srcrel];
        if ba_search(srcrelid,record,attr,val,op) returns SUCCESS:
            retval = ba_insert(targetrelid,record);
            if(insert fails):
                close the targetrel(by calling closeRel(targetrel) method of schema layer)
                delete targetrel (by calling deleteRel(targetrel) of schema layer)
                return retval

        else: break
    */

    //Close the target relation using closeRel() method of schema layer
    // return SUCCESS;
    
}
```

---
## Project
#### Description
This function creates a new target relation with list of Attributes specified in the arguments. For each record of the source relation, it inserts a new record into the Target relation with the attribute values corresponding to the attributes specified in the attribute list.

#### Arguments
 **Attribute** | **Type**          | **Description**                                                                                                            
---------------|-------------------|----------------------------------------------------------------------------------------------------------------------------
 srcRel        | `char[ATTR_SIZE]`   | Name of Source Relation.                                                                                                   
 targetRel     | `char [ATTR_SIZE]`  | Name of the target Relation(target relation is the Project of source Relation)                                             
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
#### Algorithm
```cpp
int project(char srcRel[ATTR_SIZE],char targetRel[ATTR_SIZE],int tar_nAttrs, char tar_attrs[][ATTR_SIZE]){
    
    // get the srcrel's open relation id(let it be srcrelid), using getRelId() method of cache layer
    // if srcrel is not open in open relation table, return E_RELNOTOPEN

    //get RelCatEntry of srcrel using getRelCatEntry() of OpenRelTable in cache layer
    //get the no. of attributes present in relation from the fetched RelcatEntry.

    // let attr_offset[tar_nAttrs] be an array of type int.
    // where ith entry corresponds to the offset in the srcrel of ith attribute in the target relation.
    // let attr_types[tar_nAttrs] be an array of type int.
    // where ith entry corresponds to the type ith attribute in the target relation.
    //(type can be one of INT, FLOAT or STRING)

    /*iterate through 0 to nAttrs-1 :
        get the AttributeCat entry (using getAttrcatEntry() of Openreltable in cache layer)
        of the attribute with name tar_attrs[i]
        fill the attr_offset,attr_types arrays of target relation from the corresonding Attribute catalog entries
    */

    // retval= createRel(targetrel,tar_nAttrs,tar_attrs,attr_types);
    // if create fails return retval.

    //int targetrelid = openRel(targetrel) 
    //where openRel is a function in schema layer
    /* if open fails 
    delete target relation by calling deleteRel(targetrel) of schema layer
    return retval. */

    /*
    while (1):
        var: union Attribute record[no_of_attrs_srcrel];
        if ba_search(srcrelid,record,attr,val,op=PROJ_op) returns SUCCESS{
            declare: union Attribute proj_record[tar_nAttrs] (buffer for record which need to be inserted into target rel)
            iterate through 0 to tar_attrs-1:
                proj_record[i]=record[attr_offset[i]]
            retval= ba_insert(targetrelid,proj_record);
            if(insert fails){
                close the targetrel (by calling closeRel(targetrel) method of schema layer)
                delete targetrel (by calling deleteRel(targetrel) of schema layer)
                return retval
            }
        }
        else: break
    */

    //Close the targetrel by calling closeRel() method of schema layer
    // return SUCCESS.

}
```


---
## Join
#### Description
This function creates a new target relation with attributes constituting from both the source relations(excluding specified attribute from 2nd src relation).It inserts the records obtained by Equi-join of both the source Relations(an attribute from each Relation specified in arguments are used for equi-join) into the Target Relation.
#### Arguments
 **Attribute** | **Type**         | **Description**                   
---------------|------------------|-----------------------------------
 srcRelOne       | `char[ATTR_SIZE]`  | Name of 1st Source Relation.      
 srcRelTwo       | `char[ATTR_SIZE]`  | Name of 2nd Source Relation.      
 targetRel     | `char [ATTR_SIZE]` | Name of the target Relation       
 attrOne         | `char [ATTR_SIZE]` | Attribute/column name in srcrel1. 
 attrTwo        | `char [ATTR_SIZE]` | Attribute/column name in srcrel2. 


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
#### Algorithm
```cpp
int join(char srcRelOne[ATTR_SIZE],char srcrelTwo[ATTR_SIZE],char targetRel[ATTR_SIZE], char attrOne[ATTR_SIZE], char attrTwo[ATTR_SIZE]){
	
    // get the srcrel1's open relation id(let it be srcrelid1), using getRelId() method of Openreltable in cache layer
    // if srcrel1 is not opened in open relation table, return E_RELNOTOPEN

	// get the srcrel2's open relation id(let it be srcrelid2), using getRelId() method of Openreltable in cache layer
    // if srcrel2 is not opened in open relation table, return E_RELNOTOPEN
    
    //get the AttrCatEntry of attr1 in rel1 and attr2 in rel2 using getAttrCatEntry() method of Openreltable in cache layer.
    
    // if attr1 is not present in rel1 or attr2 not present in rel2 (failure of call to Openreltable) return E_ATTRNOTEXIST.
    
    // if attr1 and attr2 are of different types return E_ATTRTYPEMISMATCH
    
    // let nAttrs1 = no_of_attrs in rel1 ( can be found using getRelCatEntry() of Openreltable in cache layer).
    // let nAttrs2 = no_of_attrs in rel1 ( can be found using getRelCatEntry() of Openreltable in cache layer). 
    
    //Next step ensures that an index exists for atleast one of the relations
    /* if both the attributes of src rels have B+ tree:
    	  if rel1 has more records than rel2 swap srcrel1, srcrel2(swap srcrelname, relid, target attribute names)  
    	else if none of target attrs has bplus tree:
    	  if rel1 has more records than rel2 swap srcrel1, srcrel2(swap srcrelname, relid, target attribute names)
    	  create bplus tree on attr2 in rel2 (using create_bplus() method of bplus layer)
          If create fails return E_DISKFULL
    */
    
    //let tar_attrs[nAttrs1+nAttrs2-1][ATTR_SIZE] be an array of type char
    //let tar_attrtypes[nAttrs1+nAttrs2-1] be an array of type int
    //Note: The target relation has number of attributes less than nAttrs1+nAttrs2 (Why?)
    
    /* iterate through all the attributes in both the source rels and update tar_attrs[],tar_attrtype[] arrays (except for attr2 in srcrel2),
     by getting attribute catalog of each attribute from Openreltable(using method getattrcat() in cache layer) */  
       
	// retval= createRel(targetrel,nAttrs1+nAttrs2-1,tar_attrs,tar_attrtypes);
    // where createrel is a function in schema layer
    // if create fails return retval
    
    //int targetrelid = openRel(targetrel) 
    //where openRel is a function in schema layer
    /* if open fails
        delete targetrelation by calling deleteRel(targetrel) of schema layer
        return error value targetrelid
    */
    
    //var: Union Attribute rec1[nAttrs1]
    /* while ba_search(srcrelid1,rec1, ,oper=PROJ, no_val) returns success:
    		var: union Attribute Record[nAttrs2]
     		while ba_search(srcrelid2,Record, attr2, oper=EQ, rel1 record's attr1 value) returns SUCCESS:
     			 var: union Attribute tar_record[nAttrs1+nAttrs2-1]
     			 copy the rel1's, rel2's record to tar_record[] (except for attr2 offset in rel2)
     			 call ba_insert(targetrelid,tar_record);
     			 if insert fails:
                    close the targetrel(by calling closeRel(targetrel) method of schema layer)
                    delete targetrel(by calling deleteRel(targetrel) of schema layer)
                    return E_DISKFULL
     		
     */

    //close the target relation by calling closeRel() of schema layer.
     //return SUCCESS;
}
```

