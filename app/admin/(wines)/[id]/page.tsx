import {getWine} from "@/app/lib/dal/wines";
import {Box, Typography} from "@mui/material";
import Image from "next/image"
import { getImage } from "@/app/lib/dal/common";

export default async function Page({params}:{params:Promise<{id : string}>}) {

    const {id} = await params;

    const wine = (await getWine(id))!;

    //const wineImagePath = wine.image_url ? process.env.NEXT_PUBLIC_SUPABASE_URL! + "/storage/v1/object/public/images/" + encodeURI(wine.image_url) : null

    let signedImageUrlFront : string | null = null
    let signedImageUrlBack : string | null = null

    if (wine.image_url) {
        signedImageUrlFront = await getImage(wine.image_url)
    }

    if (wine.back_image_url) {
        signedImageUrlBack = await getImage(wine.back_image_url)
    }


    return (
        <Box>
            <Typography variant={'h4'}>
                {wine.name}
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant={'h6'}>Cost Information</Typography>
                <Typography>
                    Wholesale Cost: {wine.wholesale_cost ? `$${parseFloat(wine.wholesale_cost).toFixed(2)}` : 'Not set'}
                </Typography>
                <Typography>
                    Retail Cost: {wine.retail_cost ? `$${parseFloat(wine.retail_cost).toFixed(2)}` : 'Not set'}
                </Typography>
            </Box>
            {signedImageUrlFront &&
            <Image src={signedImageUrlFront} alt={wine.name} height={500} width={500} />
            }
            {signedImageUrlBack &&
            <Image src={signedImageUrlBack} alt={wine.name} height={500} width={500} />
            }
        </Box>
    )
}