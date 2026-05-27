import express from 'express'
import dotenv from 'dotenv'
import noteModel from './models/notes.model'

const app = express()
dotenv.config()

app.use(express.json())


/**
 * @routes POST /api/notes
 * @description create note title and description req bosy
 * @access Public
 */

app.post('/api/notes' , async (req ,res ) => {
        const {title , description} = req.body

        // validation
        if (!title) {
            return res.status(400).json({
                error : "Note title require"
            })
        }
        if (!description) {
            return res.status(400).json({
                error : "Note title require"
            })
        }
        
        if (title.trim().length < 3) {
             return res.status(400).json({
                error : "Title must be at least 3 characters long"
            })
        }
        if (description.trim().length > 10) {
             return res.status(400).json({
                error : "Description must be at least 10 characters long"
            })
        }

        // validation pass create note
        let newNote = noteModel.create({
            title,
            description
        })

        res.status(201).json({
            success : true,
            message : 'Note created',
            note : newNote
       })
    
})


export default  app