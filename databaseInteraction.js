const sqlite3 = require('sqlite3').verbose();
 
getBooks(0, 5, "", "");

function getBooks(priceMin, priceMax, author, genre)
{
    // open database in memory
    let db = new sqlite3.Database('bookstore.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory bookstore database.');
    });

    where = " price >= " + priceMin + " AND price <= " + priceMax;

    if(author != "")
        where += " AND author = \"" + author + "\"";
    if(genre != "")
        where += " AND genre = \"" + genre + "\"";
    
    //where = " price >= " + priceMin + " AND price <= " + priceMax + " AND author = \"" + author + "\" AND genre = \"" + genre + "\"";
    
    db.serialize(() => {
        db.each(`SELECT * FROM book WHERE` + where, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        //Return de gewenste info
        console.log(row);
        });
    });
    
    db.close((err) => {
        if (err) {
        console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};