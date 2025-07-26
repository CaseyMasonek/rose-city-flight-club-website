import { db } from "@/lib/db/client";
import { cache } from "react";
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
  return db
    .updateTable("wines")
    .set(data)
    .where("id", "=", id)
    .executeTakeFirst();
});
