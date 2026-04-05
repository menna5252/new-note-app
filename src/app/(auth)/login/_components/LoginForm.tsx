'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { handleRegister } from '@/lib/actions/register.action'
import { loginSchema, LoginSchemaType, registerSchema, RegisterSchemaType } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function LoginForm() {
    const router = useRouter()
    const {control,handleSubmit} = useForm<LoginSchemaType>({
        defaultValues: {
          
            email: '',
            password: '',
          
        },
        resolver:zodResolver(loginSchema)
    })

    
    async function onSubmit(data:LoginSchemaType){
      console.log(data);
      const response  = await signIn('credentials',{
       ...data,
       redirect:false,
       callbackUrl:'/' 
      })
      console.log(response);

      if(response?.ok){
        toast.success('login successful',{position:'top-center'})
        router.push('/')
      }
      else{
        toast.error(response?.error,{position:'top-center'})
      }

    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          
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
          
             
            <Button className='w-full' type='submit'>Login</Button>
            <p className='text-center'>Don't have an account <Link href="/register" className='underline text-blue-600'>Register</Link></p>
    </form>
  )
}
