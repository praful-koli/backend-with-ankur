import express from 'express'
import dotenv from 'dotenv'
import noteModel from './models/note.model.js'

const app = express()
dotenv.config()

app.use(express.json())

/**
 *  @routes POST /api/notes 
 *  @description create notes title and description require req.body
 *  @access Public
 */

app.post('/api/notes' , async (req , res) => {
    try {
        const {title , description} = req.body
        

        if (!title  && !description) {
            return res.status(400).json({
                error : "All fileds required"
            })
        }

        if (title.trim().length < 3) {
            return res.status(400).json({
                error : "Title must be at least 3 characters long"
            })
        }
        if (description.trim().length > 15) {
            return res.status(400).json({
                error : "description must be at least 15 characters long"
            })
        }

        let newNote = await noteModel.create({
            title , description
        })

        res.status(201).json({
            message : 'Note create successfuly',
            note : newNote
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
})

export default app