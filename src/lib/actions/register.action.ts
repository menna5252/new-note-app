"use server";

import { RegisterSchemaType } from "../schemas/auth.schema";

export async function handleRegister(data: RegisterSchemaType) {
  try {
    const response = await fetch(
      `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const finalresponse = await response.json();

    if (!response.ok) {
      return finalresponse.msg;
    }
    console.log(finalresponse);
    return true;
  } catch (error) {
    console.log(error);
  }
}
