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
                error : "Description must be at least 15 characters long"
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

/**
 * @route GET /api/notes
 * @description Get all Notes
 * @access Public
 */

app.get('/api/notes', async (req, res) => {
    try {
       
      const notes = await noteModel.find()

      if (notes.length == 0) {
         return res.status(404).json({
            error : "Notes not Found"
         })
      } 

      res.status(200).json({
         message : "fetch all notes sucessfuly",
         notes
      })
        
    } catch (error) {
        return res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
})

/**
 * @routes PATCH /api/notes/:id
 * @description update notes description by notes id & description req.body and id come form req.parms
 * @access Public
 */

app.patch('/api/notes/:id', async (req, res) => {
    try {
    const {id} = req.params
    const {description} = req.body

    if (!description) {
        return res.status(400).json({
            error : "Description required"
        })
    }

    if (description.trim().length > 30) {
        return res.status(400).json({
            error : 'Description must be at least 30 characters long'
        })
    }

    let note = await noteModel.findById(id)

    if (!note) {
        return res.status(404).json({
            error : "Note not found"
        })
    }

    note.description = description
    note.save()

    res.status(200).json({
        message : "Note description update",
        note
    })
    
        
    } catch (error) {
        return res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
})


/**
 *  @routes DELETE /api/notes/:id
 *  @description delete single notes by id 
 *  @access Public
 */

app.delete('/api/notes/:id', async (req, res) => {
      try {
       
        const {id} = req.params

        await noteModel.findByIdAndDelete(id)

        res.status(200).json({
            message : 'Note delete sucessfuly'
        })
    
    } catch (error) {
        return res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
})

export default app