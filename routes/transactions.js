const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../auth");

router.post("/", verifyToken, (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const userId = req.userId;

  db.run(
    `INSERT INTO transactions (type, category, amount, date, description, userId)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [type, category, amount, date, description, userId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

router.get("/", verifyToken, (req, res) => {
  const userId = req.userId;

  db.all(
    "SELECT * FROM transactions WHERE userId = ?",
    [userId],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ transactions: rows });
    }
  );
});

router.get("/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM transactions WHERE id = ? AND userId = ?",
    [id, req.userId],
    (err, row) => {
      if (err) return res.status(400).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Transaction not found" });
      res.json(row);
    }
  );
});

router.put("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;

  db.run(
    `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ? AND userId = ?`,
    [type, category, amount, date, description, id, req.userId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Transaction not found" });
      res.json({ updated: true });
    }
  );
});

router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM transactions WHERE id = ? AND userId = ?",
    [id, req.userId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Transaction not found" });
      res.json({ deleted: true });
    }
  );
});

module.exports = router;
