import {db} from "@/app/lib/db/client";
import {Database} from "@/app/lib/db/schema";
import {cache} from "react"
import {supabase} from "@/app/lib/db/supabaseClient";

export const getWines = cache(async () => {
    return db
        .selectFrom('wines')
        .selectAll()
        .execute()
})

export const getWine = cache(async (id:string) => {
    return db
        .selectFrom('wines')
        .selectAll()
        .where('id','=', id)
        .executeTakeFirst()
})

export const deleteWine = cache(async (id:string) => {
    return db
        .deleteFrom('wines')
        .where('id','=',id)
        .execute()
})

export const createWine = cache(async (data:{
    notes: string;
   name: string,
   vintage: string,
   type: string,
   varietals: string,
   country: string,
   region: string,
   subregion: string,
   appellation: string,
   vineyard: string,
   designation: string,
   distributor: string,
   producer: string,
   inventory_status: "In Stock" | "Out of Stock" | "TBD" | "Archived",
   tags: string,
    image_url: string | null,
}) => {
    return db
        .insertInto('wines')
        .values(data)
        .execute()
})