const Poll = require('../models/pollSchema')

/*
createPoll
updatePoll
deletePoll
getPollByKey
getPolls
getPollResponces

*/ 

createPoll = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a poll',
        })
    }
    //console.log(req);
    const poll = new Poll(body)

    if (!poll) {
        return res.status(400).json({ success: false, error: err })
    }

    poll
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: poll._id,
                message: 'Poll created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Poll not created!',
            })
        })
}

updatePollByKey = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
     //console.log(res.status);
    Poll.findOne({ key: req.params.key }, (err, poll) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Poll not found!',
            })
        }


        if (!poll) {
            return res
                .status(404)
                .json({ success: false, error: `Poll not found` })
        }

        //console.log(poll)
        poll.creater = body.creater
        poll.title = body.title
        poll.description = body.description
        poll.key=body.key
        poll.questions=body.questions
        poll
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: poll._id,
                    message: 'Poll updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Poll not updated!',
                })
            })
    })
}

deletePollByKey = async (req, res) => {
    await Poll.findOneAndDelete({ key: req.params.key }, (err, poll) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!poll) {
            return res
                .status(404)
                .json({ success: false, error: `Poll not found` })
        }

        return res.status(200).json({ success: true, data: poll })
    }).catch(err => console.log(err))
}

getPollByKey = async (req, res) => {
    console.log("HEY")
    await Poll.findOne({ key: req.params.key }, (err, poll) => {

        console.log("HEllo");
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (err) {
            return res.status(404).json({
                err,
                message: 'Poll not found!',
            })
        }

        if (!poll) {
            return res
                .status(404)
                .json({ success: false, error: `Poll not found` })
        }
        return res.status(200).json({ success: true, data: poll })
    }).catch(err => console.log(err))
}


getPolls = async (req, res) => {
    await Poll.find({}, (err, poll) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!poll.length) {
            return res
                .status(404)
                .json({ success: false, error: `Polls not found` })
        }
        return res.status(200).json({ success: true, data: poll })
    }).catch(err => console.log(err))
}


getPollsByEmail = async (req, res) => {
    await Poll.find({ email: req.params.email}, (err, poll) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!poll.length) {
            return res
                .status(404)
                .json({ success: false, error: `Polls not found` })
        }
        return res.status(200).json({ success: true, data: poll })
    }).catch(err => console.log(err))
}

module.exports = {
    createPoll,
    updatePollByKey,
    deletePollByKey,
    getPolls,
    getPollByKey,
    getPollsByEmail,
}