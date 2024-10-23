const db = require("../db");

class Category {
  static create(name, type) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO categories (name, type) VALUES (?, ?)`,
        [name, type],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM categories", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = Category;
