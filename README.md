# Solace Technical Assessment

### Frontend Implementation
The frontend of this Next.js application is structured around a main page that displays a list of notes. Each note can be viewed, edited, or deleted using the `NoteComponent`. The application uses React hooks extensively, such as in `useNotes`, to manage state and handle interactions like fetching, adding, editing, and deleting notes.

### Backend Implementation
The backend API is built with Next.js API routes. It handles CRUD operations for notes:
- **Create**: POST request to `/api/notes`
- **Read**: GET request to `/api/notes` and `/api/notes/[id]`
- **Update**: POST request to `/api/notes/[id]`
- **Delete**: DELETE request to `/api/notes/[id]`

Data validation and MongoDB interactions are managed in the services. Notes can be searched via the query parameter `/api/notes?content=` to filter notes by their content.

### Running the Application
1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying the main page file. The page auto-updates as you edit the file.

### Environment Configuration
Ensure that the `MONGODB_URI` environment variable is defined in your `.env.local` file to connect to your MongoDB database.

### Public Access
The application is publicly accessible at [https://solace-assessment-git-main-denzellews-projects.vercel.app/](https://solace-assessment-git-main-denzellews-projects.vercel.app/).