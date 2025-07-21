import {Box} from "@mui/material";
import WineForm from "@/app/components/admin/wines/wine-form";
import {getWine} from "@/app/lib/dal/wines";
import {wineFormOptions} from "@/app/lib/types/form-options";
import {getColumn} from "@/app/lib/dal/dynamic";
import {uniqueStrings} from "@/app/lib/utils";
import { getImage } from "@/app/lib/dal/common";
import { urlToObject } from "@/app/lib/utils";

export default async function Page({params}:{params:Promise<{id : string}>}) {
    const {id} = await params;

    const wine = (await getWine(id))!;

    const tags = (await getColumn('wines', 'tags')).map((tagList:string) => {
        return JSON.parse(tagList)
    })

    const uniqueTags = uniqueStrings(tags)

    const varietals = (await getColumn('wines', 'varietals')).map((varietalList:string) => {
        return JSON.parse(varietalList)
    })


    const uniqueVarietals = uniqueStrings(varietals)

    const options : wineFormOptions = {
        name: await getColumn('wines', 'name'),
        vintage: Array.from({ length: 100 }, (_, i) => (2025 - i).toString()),
        type: ["White","Red","Rosé","Sparkling","Dessert","Fortified","Other"],
        producer: await  getColumn('wines', 'producer'),
        varietals: uniqueVarietals,
        designation: await getColumn('wines', 'designation'),
        vineyard: await getColumn('wines', 'vineyard'),
        country: await getColumn('wines', 'country'),
        region: await getColumn('wines', 'region'),
        subregion: await getColumn('wines', 'subregion'),
        appellation: await getColumn('wines', 'appellation'),
        distributor: await getColumn('wines', 'distributor'),
        inventory_status: ["In Stock","Out of Stock", "Archived", "TBD"],
        tags: uniqueTags,
        wholesale_cost: [],
        retail_cost: []
    }

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