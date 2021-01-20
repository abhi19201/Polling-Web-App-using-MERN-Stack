const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Poll = new Schema(
    {
        creater: String,
        email: String,
        title: String,
        description: String,
        key: { type: String, required: [true, "You didn't specify a key"] },
        questions: [
            {
                questionText: String,
                qId: Number,
                open: Boolean,
                qImageUrl: String,
                options: [
                    {
                        optionText: String,
                        optionValue: Boolean,
                        oImageUrl: String, 
                    }
                ]
            }
        ]
    },
)

module.exports = mongoose.model('polls', Poll)



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