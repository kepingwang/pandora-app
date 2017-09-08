const router = require('express').Router();

router.use((req, res) => {
  res.status(404).send('No page found');
});

module.exports = router;
