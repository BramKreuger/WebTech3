const sqlite3 = require('sqlite3').verbose();

// Vul hierin je gewenste atributes in en run in de terminal: node databaseInteraction.js
// PriceMin en PriceMax zijn verplicht, title, autor en genre zijn optioneel
// Wanneer je iets open wil laten geef dan "" mee
// Bij genre kun je een string geven of een array met strings
// VOORBEELD: getBooks(0, 25, "animal", "george", "");
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
        where += " AND title LIKE \'%" + title + "%\'";
    if(author != "")
        where += " AND author LIKE \'%" + author + "%\'";
    if(genre != "")
    {
        if(Array.isArray(genre))
        {
            where += " AND (genre = \"" + genre[0] + "\"";
            for(var i=1; i < genre.length; i++)
            {
                where += " OR genre = \"" + genre[i] + "\"";
            }
            where += ")";
        }
        else
        {
            where += " AND genre = \"" + genre + "\"";
        }
    }

    console.log(where);

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