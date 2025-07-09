import {getWine} from "@/app/lib/dal/wines";
import {Box, Typography} from "@mui/material";
import Image from "next/image"
import {supabase} from "@/app/lib/db/supabaseClient";

export default async function Page({params}:{params:Promise<{id : string}>}) {
    const {id} = await params;

    const wine = (await getWine(id))!;

    //const wineImagePath = wine.image_url ? process.env.NEXT_PUBLIC_SUPABASE_URL! + "/storage/v1/object/public/images/" + encodeURI(wine.image_url) : null

    let imageUrl : string | null = null

    if (wine.image_url) {
        const {data} = await supabase.storage
            .from('wine-images')
            .createSignedUrl(wine.image_url!, 60 * 60);

        imageUrl = data!.signedUrl
    }

    return (
        <Box>
            <Typography variant={'h4'}>
                {wine.name}
            </Typography>
            {imageUrl &&
            <Image src={imageUrl} alt={wine.name} height={500} width={500} />
            }
        </Box>
    )
}