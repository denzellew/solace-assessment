import Note from "@/lib/models";
import { CreateNoteDto, UpdateNoteDto } from "@/lib/dtos";
import connectMongo from "@/lib/utils/connect-mongodb";

export async function createNote(body: CreateNoteDto) {
    await connectMongo();
    if (!body.title || !body.content || body.content.length < 20 || body.content.length > 300) {
        throw new Error('Validation failed');
    }
    return await Note.create(body);
}

export async function findNoteById(id: string) {
    await connectMongo();
    return await Note.findById(id);
}

export async function updateNote(id: string, body: UpdateNoteDto) {
    await connectMongo();
    if (!body.title || !body.content || body.content.length < 20 || body.content.length > 300) {
        throw new Error('Validation failed');
    }
    return await Note.updateOne({ _id: id }, body);
}

export async function deleteNote(id: string) {
    await connectMongo();
    return await Note.deleteOne({ _id: id });
}

export async function findNotes(content?: string) {
    await connectMongo();
    const query = content ? { content: { $regex: content, $options: 'i' } } : {};
    return await Note.find(query);
}