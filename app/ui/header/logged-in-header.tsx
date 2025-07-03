import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {logout} from "@/app/lib/auth/actions";
import Link from "next/link";
import Image from "next/image";

export default function LoggedInHeader() {
    return (
        <Stack spacing={1}>
            <Stack direction="row">
                <Link href="/">
                    <Image src="/logo_green.png" alt="logo" width={700} height={249} className={'w-25'} />
                </Link>
                <LogoutButton />
            </Stack>
            <Divider />
        </Stack>
    )
}

function LogoutButton() {
    return (
        <Box className="w-full">
            <Button variant='outlined' color='primary' sx={{float:'right'}} onClick={logout} >
                Log Out
            </Button>
        </Box>
    )
}