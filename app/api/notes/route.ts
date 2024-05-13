import { CreateNoteDto } from "@/lib/dtos";
import { createNote, findNotes } from "@/lib/services/notes-service";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: CreateNoteDto = await req.json(); 
        const note = await createNote(body);
        return NextResponse.json(
            { note, message: 'Your note has been created' },
            { status: HttpStatusCode.Created },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function GET(req: NextRequest) {
    const contentSearch = req.nextUrl.searchParams.get('content');
    try {
        const notes = await findNotes(contentSearch ?? undefined);
        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json({ error });
    }
}