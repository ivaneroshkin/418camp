const router = require('express').Router();
const controller = require('./controller');

router.get('/getField', (req, res) => {
  res.send(200, controller.getField());
});

router.post('/move', (req, res) => {
  const fieldBefore = controller.getField();
  if (fieldBefore[req.body.y][req.body.x] !== 0) {
    res.status(400).send('Cell blocked');
  } else {
    controller.makeMove(req.body.y, req.body.x);
    const fieldAfter = controller.getField();
    const result = controller.checkMoveResult(fieldAfter);
    if (result !== true) {
      controller.switchPlayer();
    }
    res.status(200).send('OK');
  }
});

router.get('/winner', (req, res) => {
  const result = controller.checkMoveResult(controller.getField());
  if (result === 'deadHeat') {
    res.send(200, 'deadHeat');
  }
  if (result) {
    res.send(200, controller.getPlayer());
  } else {
    res.send(200, '');
  }
});

router.post('/reset', (req, res) => {
  controller.reset();
  res.send(200, 'OK');
});

module.exports = router;
