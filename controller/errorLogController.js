const express = require('express');
const errorLogService = require('../util/errorLogService.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const errorLogData = req.body;
    const newErrorLog = await errorLogService.createErrorLog(errorLogData);
    res.status(201).send(newErrorLog);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const errorLogs = await errorLogService.getErrorLogs(filters);
    res.send(errorLogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const errorLogId = req.params.id;
    const errorLog = await errorLogService.getErrorLogById(errorLogId);
    res.send(errorLog);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).send(error);
  }
});

module.exports = router;