import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title : String,
    description : String,
}, {
    timestamps : true
})

const noteModel = mongoose.model('notes' , noteSchema)

export default noteModel