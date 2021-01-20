const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Response = new Schema(
    {
        formKey: { type: String, required: [true, "You didn't specify a key"] },
        formTitle: String,
        responses:[
            {
                name: String,
                email: String,
                questions: [
                    {
                        questionText: String,
                        qId: Number,
                        options: [
                            {
                                optionText: String,
                                optionValue: Boolean,
                            }
                        ]
                    }
                ]
            }
        ]
    },
)

module.exports = mongoose.model('responses', Response)



/*
{
    "key": "", 
    "title": "Abhijeet's First Test", 
    "description": "Just Testing....", 
    "questions": [
        {
            "open": true,
            "qImageUrl": "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
            "questionText": "What",
            "options": [
                {
                    "oImageUrl": "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
                    "optionText": "Ans",
                    "optionValue": true,
                }
            ]
        }
        
    ]
}
    

*/