"use server"

import WinesTable from "@/app/components/admin/wines/wines-table";
import {getWines} from "@/app/lib/dal/wines";


export default async function WinesTableWrapper() {
    const wines = await getWines();

    return (
            <WinesTable data={wines} />
    )
}