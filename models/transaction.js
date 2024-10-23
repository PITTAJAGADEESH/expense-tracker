const db = require("../db");

class Transaction {
  static create({ userId, type, category, amount, date, description }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO transactions (userId, type, category, amount, date, description) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, type, category, amount, date, description],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  static getAll(userId, limit, offset) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM transactions WHERE userId = ? LIMIT ? OFFSET ?",
        [userId, limit, offset],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM transactions WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static update(id, data) {
    const { type, category, amount, date, description } = data;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
        [type, category, amount, date, description, id],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM transactions WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = Transaction;
