const db = require("../db");
const bcrypt = require("bcrypt");

class User {
  static create(username, password) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 8);
      db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hashedPassword],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }
}

module.exports = User;
