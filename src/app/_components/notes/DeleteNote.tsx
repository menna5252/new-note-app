'use client'
import { Button } from '@/components/ui/button'
import { deleteNoteFn } from '@/lib/actions/delete-note.action'
import React from 'react'
import { toast } from 'sonner'

export default function DeleteNote({id}:{id:string}) {
    async function handleDeleteNote(){
     try{
        const response = await deleteNoteFn(id)
        if(response.msg=='done'){
            toast.success('note deleted successfully',{position:'top-center'})
        }
     }
     catch(error){
        toast.error((error as Error).message||'something wrong')
     }
    }
  return (
    <Button onClick={handleDeleteNote} variant={'destructive'}>
    Delete Note
    </Button>
  )
}
