const sqlite3 = require('sqlite3').verbose();

// --------------------- Dit is allemaal leuk en aardig ---------------------------------------
/*var title = document.getElementById("titleFilter").value;
var priceFrom = document.getElementsByClassName("priceFrom")[0].value;
var priceTo = document.getElementsByClassName("priceTo")[0].value;
document.getElementById("genreFilter");
document.getElementById("authorFilter");
document.getElementsByTagName("submit").onclick(getBooks(priceFrom, priceTo, title, "", ""));*/
// ------------ Maar Node.js is serverside dus alle Node.js functies kunnen  ----------------------
// ------------ niet in de browser worden aangeroepen -----------------------------------------

// Vul hierin je gewenste atributes in en run in de terminal: node databaseInteraction.js
getBooks(0, 25, "", "", "Fantasy");
function getBooks(priceMin, priceMax, title, author, genre)
{
    // open database in memory
    let db = new sqlite3.Database('bookstore.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory bookstore database.');
    });

    where = " price >= " + priceMin + " AND price <= " + priceMax;

    if(title != "")
        where += " AND title = \"" + title + "\"";
    if(author != "")
        where += " AND author = \"" + author + "\"";
    if(genre != "")
        where += " AND genre = \"" + genre + "\"";
    
    //where = " price >= " + priceMin + " AND price <= " + priceMax + " AND author = \"" + author + "\" AND genre = \"" + genre + "\"";
   // console.log(`SELECT * FROM book WHERE` + where);

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