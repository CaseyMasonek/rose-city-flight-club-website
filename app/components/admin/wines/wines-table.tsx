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
import {Box, Button, Link, MenuItem, Stack} from '@mui/material'
import {handleDeleteWine} from "@/app/lib/admin/actions";
import {useRouter} from "next/navigation"

export default function WinesTable({data}:{data:Wine[]}) {
    const router = useRouter();

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
        enableRowSelection: true,
    })

    const handleDelete = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
            handleDeleteWine(row.getValue('id'));

            router.refresh()
        });
    }

    const handleNew = () => {
        router.push('/admin/new');
    }
    
    return (
        <Box>
            <Stack direction={'row'} sx={{
                display: 'flex',
                justifyContent: 'right',
                mb: 1
            }} spacing={1}>
                <Button
                    color="secondary"
                    disabled={!(table.getSelectedRowModel().flatRows.length == 1)}
                    variant="contained"
                >
                    Edit
                </Button>
                <Button
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleDelete}
                    variant="contained"
                >
                    Delete
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleNew}
                >
                    New
                </Button>
            </Stack>

            <MaterialReactTable table={table} />
        </Box>
    )
}