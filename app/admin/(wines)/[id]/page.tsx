import {getWine} from "@/app/lib/dal/wines";
import {Box, Typography} from "@mui/material";
import Image from "next/image"
import { getImage } from "@/app/lib/dal/common";

export default async function Page({params}:{params:Promise<{id : string}>}) {
    const {id} = await params;

    const wine = (await getWine(id))!;

    //const wineImagePath = wine.image_url ? process.env.NEXT_PUBLIC_SUPABASE_URL! + "/storage/v1/object/public/images/" + encodeURI(wine.image_url) : null

    let signedImageUrl : string | null = null

    if (wine.image_url) {
        signedImageUrl = await getImage(wine.image_url)
    }

    return (
        <Box>
            <Typography variant={'h4'}>
                {wine.name}
            </Typography>
            {signedImageUrl &&
            <Image src={signedImageUrl} alt={wine.name} height={500} width={500} />
            }
        </Box>
    )
}