import { CreateNoteDto } from "@/lib/dtos";
import Note from "@/lib/models";
import connectMongo from "@/lib/utils/connect-mongodb";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMongo();
        const body: CreateNoteDto = await req.json(); 
        if (body.title && body.content) {
            const note = await Note.create(body);
            return NextResponse.json(
                { note, message: 'Your note has been created' },
                { status: HttpStatusCode.Created },
            );
        }
        return NextResponse.json({ message: 'Note title or content is missing' }, { status: HttpStatusCode.BadRequest });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function GET(req: NextRequest) {
    const contentSearch = req.nextUrl.searchParams.get('content');
    try {
        await connectMongo();
        const query = contentSearch ? { content: { $regex: contentSearch, $options: 'i' } } : {};
        const notes = await Note.find(query);
        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json({ error });
    }
}