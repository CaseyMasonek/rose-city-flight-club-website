import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {logout} from "@/app/lib/auth/actions";
import Link from "next/link";
import Image from "next/image";
import {User} from "@/app/lib/types/user";
import HeaderAvatar from "@/app/components/header/header-avatar";
import HeaderButtons from "@/app/components/header/header-buttons";

export default function AdminHeader({user}:{user:User}) {
    return (
        <Stack spacing={1}>
            <Stack direction="row" sx={{ px: 3, height: "5vh" }}>
                <Link href="/admin">
                    <Image src="/logo_green.png" alt="logo" width={700} height={249} style={{ width: 136 }} />
                </Link>
                <Stack direction="row" sx={{
                    display: "flex",
                    justifyContent: "right",
                    width: "100%",
                }} spacing={5}>
                    <HeaderButtons />
                    <HeaderAvatar user={user} />
                </Stack>
            </Stack>
            <Divider />
        </Stack>
    )
}

function LogoutButton() {
    return (
        <Box sx={{ width: '100%' }}>
            <Button variant='outlined' color='primary' sx={{float:'right'}} onClick={logout} >
                Log Out
            </Button>
        </Box>
    )
}