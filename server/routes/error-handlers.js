const router = require('express').Router();

router.use((err, req, res) => {
  if (err.status === 404) {
    res.send(err.message);
  } else {
    res.send('unknown error');
  }
});

module.exports = router;
