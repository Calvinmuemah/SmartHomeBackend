const express = require('express');
const router = express.Router();
const {
  sendSensorData,
  getMetrics,
  sendControlCommand,
  getControlCommand
} = require('../controllers/iotController');

router.post('/data', sendSensorData);
router.get('/devices/metrics/:deviceId', getMetrics);
router.post('/devices/control', sendControlCommand);
router.get('/command/:deviceId', getControlCommand);

module.exports = router;