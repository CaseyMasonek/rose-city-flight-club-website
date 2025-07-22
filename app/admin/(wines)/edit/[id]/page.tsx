import {Box} from "@mui/material";
import WineForm from "@/app/components/admin/wines/wine-form";
import {getWine} from "@/app/lib/dal/wines";
import {getWineFormOptions} from "@/app/lib/admin/wines/form-options-util";
import { getImage } from "@/app/lib/dal/common";
import { urlToObject } from "@/app/lib/utils";

export default async function Page({params}:{params:Promise<{id : string}>}) {
    const {id} = await params;

    const wine = (await getWine(id))!;

    const options = await getWineFormOptions()

    let frontFile : File | undefined = undefined

    if (wine.image_url) {
        const signedUrl = await getImage(wine.image_url)
        frontFile = await urlToObject(signedUrl)
    }

    let backFile : File | undefined = undefined

    if (wine.back_image_url) {
        const signedUrl = await getImage(wine.back_image_url)
        backFile = await urlToObject(signedUrl)
    }
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <WineForm options={options} data={wine} defaultFrontImage={frontFile} defaultBackImage={backFile} id={wine.id} />
        </Box>
    )
}