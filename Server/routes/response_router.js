const express = require('express')

const ResponseCtrl = require('../controllers/response_ctrl')

const router = express.Router()

router.post('/responseform', ResponseCtrl.createResponseForm)
router.put('/responseform/:formKey', ResponseCtrl.updateResponseForm)
router.put('/responseIn/:formKey', ResponseCtrl.createResponseByKey)
router.put('/responseUp/:formKey/:email', ResponseCtrl.updateResponseByKey)
router.delete('/responseform/:formKey', ResponseCtrl.deleteResponseFormByKey)
router.delete('/response/:formKey/:email', ResponseCtrl.deleteResponseByKey)
router.get('/response/:formKey/:email', ResponseCtrl.getResponseByKey)
router.get('/responses/:formKey', ResponseCtrl.getResponses)

module.exports = router


