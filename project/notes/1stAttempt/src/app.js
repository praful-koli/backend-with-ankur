import express from 'express'
import dotenv from 'dotenv'
import noteModel from './models/notes.model.js'

const app = express()
dotenv.config()

app.use(express.json())

/**
 * @route POST /api/notes
 * @description Create a new note need title and description in the request body
 * @access Public
 */

app.post('/api/notes' , async (req, res) => {
    try {
        const {title , description} = req.body

        // Validation

        if (!title & !description) {
            return res.status(400).json({error : 'All filed require'})
        }
        
        if (title.trim().length < 3) {
            return res.status(400).json({ error: "Title must be at least 3 characters long" });
        }
    
        if (description.trim().length < 10) {
            return res.status(400).json({ error: "Description must be at least 10 characters long" });
        }

        // if Validtion passs create the notes save in database

        const newNote = await noteModel.create({
            title, description
        })

        res.status(201).json({
            success : true,
            message : 'Note created',
            note : newNote
        })
        
    } catch (error) {
        return res.status(500).json({
            error : 'Internal server error'
        })
    }
})

export default app