"use server"

import {createWine, deleteWine} from "@/app/lib/dal/wines"
import { supabase } from '@/app/lib/db/supabaseClient';

export async function handleDeleteWine(id:string):Promise<void> {
    await deleteWine(id)
}

export async function uploadImage(file: File) {
    const filePath = `${Date.now()}_${file.name}`;

    console.log(filePath);

    const { data, error } = await supabase.storage
        .from('wine-images')
        .upload(filePath, file);

    console.log(data, error);

    if (error) throw error;

    return data.path; // save this in your Postgres DB
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
    image_url: string | null,
}) {
    await createWine(data)
}