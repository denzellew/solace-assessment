import { UpdateNoteDto } from "@/lib/dtos";
import Note from "@/lib/models";
import connectMongo from "@/lib/utils/connect-mongodb";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;
  try {
    await connectMongo();
    const note = await Note.findById(id);
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        await connectMongo();
        const body: UpdateNoteDto = await req.json(); 
        if (body.title && body.content) {
            const note = await Note.updateOne({ _id: id }, body);
            return NextResponse.json(
                { note, message: 'Your note has been updated' },
                { status: HttpStatusCode.Ok },
            );
        }
        return NextResponse.json({ message: 'Note title or content is missing' }, { status: HttpStatusCode.BadRequest });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    await connectMongo();
    await Note.deleteOne({ _id: id });
    return NextResponse.json({ message: "Note deleted successfully" }, { status: HttpStatusCode.Ok });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
