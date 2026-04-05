'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { handleRegister } from '@/lib/actions/register.action'
import { registerSchema, RegisterSchemaType } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterForm() {
    const router = useRouter()
    const {control,handleSubmit} = useForm<RegisterSchemaType>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            age: '',
            phone: ''
        },
        resolver:zodResolver(registerSchema)
    })

    
    async function onSubmit(data:RegisterSchemaType){
       const isRegistered = await handleRegister(data)
       if(isRegistered==true){
        toast.success('account created successfully',{position:'top-center'})
        router.push('/login')

       }
       else{
        toast.error(isRegistered,{position:'top-center'})
       }

    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
           <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="password"
                    type='password'
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           <Controller
              name="age"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="age">
                    age
                  </FieldLabel>
                  <Input
                    {...field}
                    id="age"
                    aria-invalid={fieldState.invalid}
                    placeholder="age"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">
                    phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="phone"
                    type='tel'
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
             
            <Button className='w-full' type='submit'>Register</Button>
            <p className='text-center'>Already have an account? <Link href="/login" className='underline text-blue-600'>Login</Link></p>
    </form>
  )
}
