import { cache } from "react";
import { supabase } from "../db/supabaseClient";

export const getImage = cache(async (path:string) => {
    const {data} = await supabase.storage
        .from('wine-images')
        .createSignedUrl(path, 60 * 60);

    return data!.signedUrl
})
