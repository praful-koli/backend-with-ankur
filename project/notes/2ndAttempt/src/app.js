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

/**
 *  @route GET /api/notes
 *  @description Get all notes
 *  @access Public
 */

app.get('/api/notes' , async (req, res) => {
    
    const notes = noteModel.find()
    res.status(200).json({
        message : "All note fetch successfuly",
        notes
    })
})

/**
 *  @route PACTCH /api/notes/:id
 *  @description update note description by find by id descripion req body
 */

app.patch('/api/notes/:id' , async (req ,res) => {
    const {description} = req.body
    const {id} = req.params

    //validaiton

    if(!description) {
        return res.status(400).json({
            error : "Descripion require to update a note"
        })
    }

    if (description.tirm().length > 10) {
        return res.status(400).json({
            error : "Description must be at least 10 characters long"
        })
    }

    //validation pass patch the note 

    let note = noteModel.findById(id)
    
    if (!note) {
        return res.status(404).json({
            error : 'Note not found'
        })
    }

    note.description = description;
    note.save()

    res.status(200).json({
        message : "Note updated",
        note
    })
})



export default  app