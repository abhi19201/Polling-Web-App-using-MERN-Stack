const ResponseForm = require('../models/responseSchema')

/*
createPoll
updatePoll
deletePoll
getPollByKey
getPolls
getPollResponces

*/ 

createResponseForm = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Response Form',
        })
    }
    //console.log(req);
    const responseForm = new ResponseForm(body)

    if (!responseForm) {
        return res.status(400).json({ success: false, error: err })
    }

    responseForm
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: responseForm._id,
                message: 'Response Form created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Response Form not created!',
            })
        })
}



updateResponseForm =  async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Response Form',
        })
    }

    await ResponseForm.findOne({ formKey: req.params.formKey }, async (err, responseForm) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Response Form not found!',
            })
        }


        if (!responseForm) {
            return res
                .status(404)
                .json({ success: false, error: `Response Form not found` })
        }

        responseForm.formKey = body.formKey
        responseForm.formTitle = body.formTitle
        responseForm.responses = body.responses

        responseForm
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: responseForm._id,
                message: 'Response Form Updated!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Response Form not Updated!',
            })
        })

    })
    //console.log(req);

    
}


createResponseByKey =  async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    
    ResponseForm.findOne({ formKey: req.params.formKey }, async (err, responseForm) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Response Form not found!',
            })
        }


        if (!responseForm) {
            return res
                .status(404)
                .json({ success: false, error: `Response Form not found` })
        }

        //console.log(responseForm);

        responseForm.responses.push(
            {
                name: body.name,
                email: body.email,
                questions: body.questions
            }
        )

        
        responseForm
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: responseForm._id,
                    message: 'Response Submitted!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Response not Submitted!',
                })
            })
    }).catch(err => console.log(err))
}


updateResponseByKey = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    
    ResponseForm.findOne({ formKey: req.params.formKey }, async (err, responseForm) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Response Form not found!',
            })
        }


        if (!responseForm) {
            return res
                .status(404)
                .json({ success: false, error: `Response Form not found` })
        }

        console.log(responseForm);

        if(
            responseForm.responses.find((response,i)=>{

                
                if(response.email === req.params.email){
                    console.log("AALLLLL");
                    responseForm.responses[i].name = body.name,
                    responseForm.responses[i].email = body.email,
                    responseForm.responses[i].questions = body.questions

                    return "UPDATED";
    
                }
            }) === undefined
        ){
            return res.status(404).json({
                success: false,
                message: 'Response not found!',
            })
        }else{
            responseForm
                        .save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                id: responseForm._id,
                                message: 'Response updated!',
                            })
                        })
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Response not updated!',
                            })
                        })
        }
        
    }).catch(err => console.log(err))
}



deleteResponseFormByKey = async (req, res) => {
    await ResponseForm.findOneAndDelete({ formKey: req.params.formKey }, (err, responseForm) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!responseForm) {
            return res
                .status(404)
                .json({ success: false, error: `Response Form not found` })
        }

        return res.status(200).json({ success: true, data: responseForm })
    }).catch(err => console.log(err))
}


deleteResponseByKey = async (req, res) => {
    const body = req.body
    var deleted;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
     //console.log(res.status);


     ResponseForm.findOne({ formKey: req.params.formKey }, (err, responseForm) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Response Form not found!',
            })
        }


        if (!responseForm) {
            return res
                .status(404)
                .json({ success: false, error: `Response Form not found` })
        }


        responseForm.responses.find((response,i)=>{
            
            if(response.email === req.params.email){

                console.log(responseForm.responses)
                deleted = responseForm.responses.splice(i,1)
                console.log(responseForm.responses)
                
            }
        })
        
        responseForm
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    data: deleted,
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Response not deleted!',
                })
            })

        
    }).catch(err => console.log(err))
}


getResponseByKey = async (req, res) => {
    //console.log("HEY")
    await ResponseForm.findOne({ formKey: req.params.formKey }, (err, responseForm) => {

        console.log("HEllo",responseForm);
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (err) {
            return res.status(404).json({
                err,
                message: 'Response Form not found!',
            })
        }

        if (!responseForm) {
            return res
                .status(404)
                .json({ success: false, error: `Response Form not found` })
        }

        if(
            responseForm.responses.find((response,i)=>{
                
                if(response.email === req.params.email){
    
                    return res.status(200).json({ success: true, data: response })
                    
                }
            }) ===undefined
        ){
            return res.status(200).json({ success: true, data: "Response not found" })
        }
        
        
    }).catch(err => console.log(err))
}


getResponses = async (req, res) => {
    console.log(req)
    await ResponseForm.findOne({ formKey: req.params.formKey }, (err, responseForm) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!responseForm) {
            return res
                .status(404)
                .json({ success: false, error: `Response Form not found` })
        }
        return res.status(200).json({ success: true, data: responseForm.responses })
    }).catch(err => console.log(err))
}

module.exports = {
    createResponseForm,
    updateResponseForm,
    createResponseByKey,
    updateResponseByKey,
    deleteResponseFormByKey,
    deleteResponseByKey,
    getResponses,
    getResponseByKey,
}