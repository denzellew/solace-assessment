export interface CreateNoteDto {
    title: string;
    content: string;
}

export interface UpdateNoteDto extends CreateNoteDto {
    _id: string;
}

