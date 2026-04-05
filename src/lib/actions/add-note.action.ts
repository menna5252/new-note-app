'use server';

import { getUserToken } from "@/utilities/get-token";
import { revalidatePath, updateTag } from "next/cache";


export async function addNoteFn(title:string,content:string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("unauthinticated user");
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        token: `3b8ny__${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),

    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.msg || "failed to fetch notes");
    }
    updateTag('notes');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message||"failed to add note");
  }
}
