const express = require('express');
const createTable = require('../database/create-table');
const scanTable = require('../database/scan-table');

const router = express.Router();

router.get('/api/db/create', (req, res) => {
  createTable();
  res.send('table create finish');
});
router.get('/api/db/scan', (req, res) => {
  scanTable(req, res);
});

module.exports = router;
