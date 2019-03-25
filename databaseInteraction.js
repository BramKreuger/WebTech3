const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database('bookstore.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory bookstore database.');
});
 
db.serialize(() => {
    db.each(`SELECT book_ID as id,
                    title as name
             FROM book`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
   
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });