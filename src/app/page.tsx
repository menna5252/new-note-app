import { ScrollArea } from "@/components/ui/scroll-area";
import { Note, NotesResponse } from "@/interfaces/notes.interface";
import { getUserNotes } from "@/lib/services/notes.service";
import UserNote from "./_components/notes/UserNote";
import AddNote from "./_components/notes/AddNote";

export default async function Home() {
  const data:NotesResponse = await getUserNotes();

  console.log(data?.notes);

  return (
    <>
   {data?.notes.length>0?<ScrollArea className="h-[80vh]  p-4">
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
       {data?.notes.map((note:Note) => (
        <UserNote key={note._id} note={note} />
      ))}
     </div>
</ScrollArea>:<p>no notes found</p>}
<AddNote/>
    </>
  );
}
