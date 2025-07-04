"use client"

import {Box, Button, ButtonGroup} from "@mui/material";
import {usePathname} from "next/navigation"
import Link from "next/link";

export default function HeaderButtons() {
    const pages = [
        {label:"Wines", path:"/admin"},
        {label:"Clients", path:"/admin/clients"},
        {label:"Orders", path:"/admin/orders"},
    ]

    const currentPage = usePathname()

    return (
        <Box>
            <ButtonGroup variant="contained">
                {pages.map((page) => (
                    <Link href={page.path}>
                        <Button key={page.label} color={currentPage == page.path || (currentPage == "/" && page.label == "Wines") ? 'primary' : 'inherit'}>
                            {page.label}
                        </Button>
                    </Link>
                ))}
            </ButtonGroup>
        </Box>

    )
}