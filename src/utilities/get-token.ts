'use server';

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken(){
const cookie = await cookies()
const token = cookie.get('next-auth.session-token')?.value||cookie.get('__Secure-next-auth.session-token')?.value
const encodedToken = await decode({token,secret:process.env.AUTH_SECRET!})
return encodedToken?.token;
}