import { Schema, model, models } from "mongoose";



export interface INote {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const NoteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const Note = models.Note || model('Note', NoteSchema, 'notes');

export default Note;

