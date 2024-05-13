import { UpdateNoteDto } from "@/lib/dtos";
import { deleteNote, findNoteById, updateNote } from "@/lib/services/notes-service";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const note = await findNoteById(id);
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const body: UpdateNoteDto = await req.json(); 
        const note = await updateNote(id, body);
        return NextResponse.json(
            { note, message: 'Your note has been updated' },
            { status: HttpStatusCode.Ok },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    await deleteNote(id);
    return NextResponse.json({ message: "Note deleted successfully" }, { status: HttpStatusCode.Ok });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
