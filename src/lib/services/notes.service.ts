
import { getUserToken } from "@/utilities/get-token";

export async function getUserNotes() {
  const token = await getUserToken();

  if (!token) {
    throw new Error("unauthinticated user");
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/notes`, {
      next:{tags:['notes']},
      headers: {
        token: `3b8ny__${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.msg || "failed to fetch notes");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
