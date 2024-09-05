import { Document, model, models, Schema } from "mongoose"

interface IJournal {
    content:string,
    date:Date
}

interface Journal extends Document {
    email:string,
    journal:IJournal[]
}

const iJournalSchema = new Schema({
    content:{type:String, required:true},
    date:{type:Date,default:Date.now}
})

const journalSchema = new Schema({
    email:{type:String, required:true, unique:true},
    journals:[iJournalSchema]
})

const ReflectifyJournal = models.reflectifyJournal || model<Journal>("reflectifyJournal", journalSchema);

export default ReflectifyJournal;