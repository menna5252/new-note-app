"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { NoteFormData, noteSchema } from "@/lib/schemas/note.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNoteFn } from "@/lib/actions/add-note.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateNoteFn } from "@/lib/actions/update-note.action";
import { Note } from "@/interfaces/notes.interface";

export default function UpdateNote({note}:{note:Note}) {
const [open, setOpen] = useState(false);
const router = useRouter();
  const { control, handleSubmit,reset,formState:{isSubmitting}} = useForm<NoteFormData>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(noteSchema),
  });

  async function onSubmit(data: NoteFormData) {
    console.log(data);
    try{
        const response = await updateNoteFn(data.title,data.content,note._id);
        console.log(response);
        if(response.msg=='done'){
            toast.success('note updated successfully',{position:'top-center'});
            reset();
            setOpen(false);
         
          

        }
    }
    catch(error){
        console.log(error);
        toast.error((error as Error).message||"failed to update note",{position:'top-center'})
        
    }
  }
  useEffect(() => {
      if(open){
        reset({
          title:note.title,
          content:note.content
        })
      }
  },[open,note])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit mx-auto">update Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>update Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">title</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  placeholder="title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="content">content</FieldLabel>
                <Input
                  {...field}
                  id="content"
                  aria-invalid={fieldState.invalid}
                  placeholder="content"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter className="sm:justify-start">
            <Button  type="submit">
              {isSubmitting ? "updating..." : "update Note"}
            </Button>
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
