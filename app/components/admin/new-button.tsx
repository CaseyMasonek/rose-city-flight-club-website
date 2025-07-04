"use client"

import {SpeedDial, SpeedDialAction, Typography} from "@mui/material";
import {SpeedDialIcon} from "@mui/material";
import {WineBar, PersonAddAlt1, Receipt} from "@mui/icons-material";
import {redirect} from "next/navigation";

export default function NewButton() {
    return (
        <SpeedDial ariaLabel={'new-button'} icon={<SpeedDialIcon />}>
            <SpeedDialAction icon={<WineBar />} title="New Wine" onClick={() => redirect('/admin/new')} />
            <SpeedDialAction icon={<PersonAddAlt1 />} title="New Client" onClick={() => redirect('/admin/clients/new')} />
            <SpeedDialAction icon={<Receipt />} title="New Order" onClick={() => redirect('/admin/orders/new')} />
        </SpeedDial>
    )
}