const express = require('express')

const PollCtrl = require('../controllers/poll_ctrl')

const router = express.Router()

router.post('/poll', PollCtrl.createPoll)
router.put('/poll/:key', PollCtrl.updatePollByKey)
router.delete('/poll/:key', PollCtrl.deletePollByKey)
router.get('/poll/:key', PollCtrl.getPollByKey)
router.get('/polls', PollCtrl.getPolls)
router.get('/polls/:email', PollCtrl.getPollsByEmail)

module.exports = router


