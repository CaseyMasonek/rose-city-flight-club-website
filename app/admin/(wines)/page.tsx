"use server"

import {Box, Typography} from "@mui/material";
import WinesTable from "@/app/components/admin/wines/wines-table";
import {getWines} from "@/app/lib/dal/wines";


export default async function Page() {
    const wines = await getWines();

    return (
        <Box>
            <Typography variant={'h3'}>
                All Wines
            </Typography>
            <WinesTable data={wines} />
        </Box>
    )
}