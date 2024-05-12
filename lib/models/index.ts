import { Schema, model, models } from "mongoose";



export interface INote {
  id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const NoteSchema = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

// Virtual for getting 'id' without underscore
NoteSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
NoteSchema.set('toJSON', {
  virtuals: true
});

const Note = models.Note || model('Note', NoteSchema, 'notes');

export default Note;

