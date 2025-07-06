"use server"

import {deleteWine} from "@/app/lib/dal/wines"

export async function handleDeleteWine(id:string):Promise<void> {
    await deleteWine(id)
}