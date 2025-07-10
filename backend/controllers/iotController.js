const { isObjectIdOrHexString } = require('mongoose');
const db = require('../config/firebase');

// IoT sends data
exports.sendSensorData = async (req, res) => {
  const { deviceId, data } = req.body;
  try {
    await db.ref(`metrics/${deviceId}`).set(data);
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sensor data', error });
  }
};

// Frontend fetches metrics
exports.getMetrics = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const snapshot = await db.ref(`metrics/${deviceId}`).once('value');
    res.status(200).json(snapshot.val() || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching metrics', error });
  }
};

// Frontend sends control command
exports.sendControlCommand = async (req, res) => {
  const { deviceId, command } = req.body;
  try {
    await db.ref(`commands/${deviceId}`).set(command);
    res.status(200).json({ message: 'Command sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending command', error });
  }
};
// iot get commands
exports.getControlCommand = async (req, res) => {
  const { deviceId } = req.params;

  try {
    const snapshot = await db.ref(`commands/${deviceId}`).once('value');
    const command = snapshot.val();

    res.status(200).json({ deviceId, command: command || null });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch control command', error });
  }
};
