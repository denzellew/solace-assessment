import NotesList from "./_components/notes-list"; // Adjust the import path as necessary

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4">Solace Assessment - Notes App</h1>
        <NotesList />
      </div>
    </main>
  );
}

