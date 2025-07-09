"use server"

import {createWine, deleteWine} from "@/app/lib/dal/wines"

export async function handleDeleteWine(id:string):Promise<void> {
    await deleteWine(id)
}

export async function handleCreateWine (data:{
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
}) {
    await createWine(data)
}