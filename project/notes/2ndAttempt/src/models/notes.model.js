import mongoose from 'mongoose'

const noteScheam = new mongoose.Schema({
    note:String,
    description : String
},{
    timestamps : true
})

let noteModel = mongoose.model('notes' , noteScheam)

export default noteModel