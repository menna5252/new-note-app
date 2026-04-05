import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Note } from '@/interfaces/notes.interface'
import React from 'react'
import UpdateNote from './UpdateNote'
import DeleteNote from './DeleteNote'

export default function UserNote({note}:{note:Note}) {
  return (
       <Card className='border-2'>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
       
      </CardHeader>
      <CardContent>
        <p>
          {note.content}
        </p>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-3'>
        <p>{new Date(note.createdAt).toLocaleDateString('en-us',{
            day:'numeric',
            month:'short',
            year:'numeric',
            hour:'2-digit',
            minute:'2-digit',
            hour12:true
        })}</p>
        <div className="flex gap-3">
        <UpdateNote note={note}/>
        <DeleteNote  id={note._id}/>
        </div>
      </CardFooter>
    </Card>
  )
}
