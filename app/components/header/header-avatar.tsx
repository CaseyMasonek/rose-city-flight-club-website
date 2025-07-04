"use client"

import {Avatar, Box, Button, Menu, MenuItem, MenuList} from "@mui/material";
import {User} from "@/app/lib/types/user";
import {useState,useRef} from "react";
import {logout} from "@/app/lib/auth/actions";
import getDocumentElement from "@popperjs/core/lib/dom-utils/getDocumentElement";

export default function HeaderAvatar({user}:{user:User}) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    return (
        <Box sx={{

        }}>
            <Menu open={isMenuOpen} onClose={() => setMenuOpen(false)} anchorEl={ref.current}>
                <MenuList>
                    <MenuItem onClick={logout}>
                        Log out
                    </MenuItem>
                </MenuList>
            </Menu>

            <Avatar
                onClick={() => setMenuOpen(true)}
                ref={ref}
                sx={{ bgcolor: "#005154" }}
            >
                <Button sx={{ color: "#fff" }}>
                    {user.first_name[0] + user.last_name[0]}
                </Button>
            </Avatar>
        </Box>
    )
}