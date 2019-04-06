//This file handles the requests based
// on the registration and login forms
var sqlite3 = require("sqlite3").verbose();
var express = require('express');
var router = express.Router();


// REGISTER REQUEST HANDLER
router.post('/register', function(req, res, next) 
{
	let db = openDB();
    console.log("connection with database established");

  	const user = req.body.email;
    console.log(user);
    var response = "";

    db.all(
    	'SELECT * FROM user WHERE email=$user',
    	{$user: user},
    	(err, rows) =>
    	{
    		//check whether email is already registered
    		if (rows.length > 0)
    		{
                //let client know user already registered
    			response = "NOK";
                res.json(response);
    		}
    		else
    		{	
    			//add account to the database
    			db.run(
    				'INSERT INTO user VALUES ($firstName, $lastName, $password, $bookHistory, $email)',
    				{
    					$firstName: req.body.fname,
    					$lastName: req.body.lname,
    					$password: req.body.password,
    					$bookHistory: '',
    					$email: req.body.email,
    				},
    				(err) =>
    				{
    					if(err)
    					{
    						console.log(err.message);
    					}
    					else
    					{
                            //let client know registration was succesful
                            console.log("New user is added to the database");
    						response = "OK";
                            res.json(response);
    					}
    				}
    			);
    		}
    	}
    );
	
	//close database connection, log activity
	closeDB(db);
    console.log("closed database connection");
    console.log("succesfully handled register request");
});

// LOGIN REQUEST HANDLER
router.post('/login', function(req, res, next) 
{
  	let db = openDB();

  	const user = req.body.email;
  	const password = req.body.password;
    var response = "";
   
    // check if login info corresponds to registered account
	db.all(
    	'SELECT * FROM user WHERE email=$user AND password=$password',
    	{$user: user, $password:password},
    	(err, rows) =>
    	{
    		//check whether login info is in database
    		if (rows.length > 0)
    		{
                //let client know login NOT found
    			response = "NOK";
                res.json(response);
    		}
    		else
    		{	
                //let client know login found
    			response = "OK";
                res.json(response);
    		}
    	}
    );

    //close db connection, log activity
    closeDB(db);
    console.log("closed database connection");
    console.log("sucessfully handled login request");
});

module.exports = router;





function newID()
{
    // COUNT NUMBER OF USERS IN THE DATABASE
    var numberUsers = 0;
    let db = openDB();
    db.all(
            'SELECT * FROM user',
            {},
            (err, rows) =>
            {
                numberUsers = rows.length + 1;
            }   
        );


    closeDB(db);
    return numberUsers; 
}

function openDB()
{
   // ESTABLISH CONNECTION WITH DATABASE
	let db = new sqlite3.Database('./bookstore.db', sqlite3.OPEN_READWRITE, (err) => {
  	if (err) {
    console.error(err.message);
  	}
	});
	return db;
}

function closeDB(db)
{
	//CLOSE CONNECTION WITH DATABASE
	db.close((err) => {
  	if (err) {
    	console.error(err.message);
  	}
	});
	
}
