"use client"

import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_Row
} from 'material-react-table';
import {Wine} from "@/app/lib/types/wines";
import NextLink from 'next/link';
import {Link} from '@mui/material'


export default function WinesTable({data}:{data:Wine[]}) {
    
    const columns = useMemo<MRT_ColumnDef<Wine>[]>(() => [
        {
            accessorKey: 'id',
            header: 'ID',
            Cell: ({renderedCellValue}) => (
                <NextLink href={`/admin/${renderedCellValue}`}>
                    <Link>
                        {renderedCellValue}
                    </Link>
                </NextLink>
            )
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'vintage',
            header: 'Vintage'
        },
        {
            accessorKey: 'distributor',
            header: 'Distributor'
        },
        {
            accessorKey: 'type',
            header: 'Type'
        },
        {
            accessorKey: 'producer',
            header: 'Producer'
        },
        {
            accessorKey: 'varietals',
            header: 'Varietals'
        },
        {
            accessorKey: 'designation',
            header: 'Designation'
        },
        {
            accessorKey: 'vineyard',
            header: 'Vineyard'
        },
        {
            accessorKey: 'country',
            header: 'Country'
        },
        {
            accessorKey: 'region',
            header: 'Region'
        },
        {
            accessorKey: 'subregion',
            header: 'Subregion'
        },
        {
            accessorKey: 'appellation',
            header: 'Appellation'
        },
        {
            accessorKey: 'notes',
            header: 'Notes'
        },
        {
            accessorKey: 'inventory_status',
            header: 'Status'
        },
        {
            accessorKey: 'tags',
            header: 'Tags'
        },
    ],[])

    const table = useMaterialReactTable({
        columns,
        data,
    })
    
    return <MaterialReactTable table={table} />
}