import {Box, Stack} from '@mui/material';
import WineForm from "@/app/components/admin/wines/wine-form";
import {getColumn} from "@/app/lib/dal/dynamic";
import {wineFormOptions} from "@/app/lib/types/form-options";
import {uniqueStrings} from "@/app/lib/utils";

export default async function Page() {
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
        vintage: await getColumn('wines', 'vintage'),
        type: ["White","Red","Rose"],
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
        tags: uniqueTags
    }

    const horizontallyCentered = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }

    return (
        <Box>
            <Stack sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }} spacing={10}>
                <Box sx={horizontallyCentered}>
                    <WineForm options={options} />
                </Box>
            </Stack>
        </Box>
    )
}