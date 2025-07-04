"use client"

import {Button, ButtonGroup} from "@mui/material";
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
        <ButtonGroup variant="contained">
            {pages.map((page) => (
                <Button key={page.label} color={currentPage == page.path ? 'primary' : 'inherit'}>
                    <Link href={page.path}>
                        {page.label}
                    </Link>
                </Button>
            ))}
        </ButtonGroup>
    )
}