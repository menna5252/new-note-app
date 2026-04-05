"use client";
import React, { useState } from "react";
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

export default function AddNote() {
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
        const response = await addNoteFn(data.title,data.content);
        console.log(response);
        if(response.msg=='done'){
            toast.success('note added successfully',{position:'top-center'});
            reset();
            setOpen(false);
         
          

        }
    }
    catch(error){
        console.log(error);
        toast.error((error as Error).message||"failed to add note",{position:'top-center'})
        
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit mx-auto">Add Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
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
              {isSubmitting ? "Adding..." : "Add Note"}
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
