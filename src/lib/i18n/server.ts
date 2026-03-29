import { cookies } from "next/headers";
import type { Language } from "@/types";

export async function getLocale(): Promise<Language> {
  const v = (await cookies()).get("app-language")?.value;
  return v === "ne" ? "ne" : "en";
}
