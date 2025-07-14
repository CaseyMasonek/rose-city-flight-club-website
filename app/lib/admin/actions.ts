"use server"

import {createWine, deleteWine, updateWine} from "@/app/lib/dal/wines"
import { supabase } from '@/app/lib/db/supabaseClient';
import { wineFormData } from "../types/wines";

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

export async function handleCreateWine (data:wineFormData) {
    await createWine(data)
}

export async function handleUpdateWine(data:wineFormData,id:string) {
    await updateWine(data,id)
}