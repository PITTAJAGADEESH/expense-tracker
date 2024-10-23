const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.get(
    `
    SELECT
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS balance
    FROM transactions`,
    [],
    (err, row) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(row);
    }
  );
});

router.get("/report", (req, res) => {
  const { month } = req.query;
  db.all(
    `
    SELECT category, SUM(amount) as total_spent
    FROM transactions
    WHERE strftime('%Y-%m', date) = ?
    GROUP BY category`,
    [month],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;
