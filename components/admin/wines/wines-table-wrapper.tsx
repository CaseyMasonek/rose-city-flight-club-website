"use server"

import WinesTable from "@/components/admin/wines/wines-table";
import {getWines} from "@/lib/dal/wines";


export default async function WinesTableWrapper() {
    const wines = await getWines();

    return (
        <WinesTable data={wines} />
    )
}