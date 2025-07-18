import { db } from "@/app/lib/db/client";
import { Database } from "@/app/lib/db/schema";
import { cache } from "react";
import { supabase } from "@/app/lib/db/supabaseClient";
import { WineFormData } from "../types/wines";

export const getWines = cache(async () => {
  return db.selectFrom("wines").selectAll().execute();
});

export const getWine = cache(async (id: string) => {
  return db
    .selectFrom("wines")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
});

export const deleteWine = cache(async (id: string) => {
  return db.deleteFrom("wines").where("id", "=", id).execute();
});

export const createWine = cache(async (data: WineFormData) => {
  return db.insertInto("wines").values(data).execute();
});

export const updateWine = cache(async (data: WineFormData, id: string) => {
 console.log(id,data)

  return db
    .updateTable("wines")
    .set(data)
    .where("id", "=", id)
    .executeTakeFirst();
});
