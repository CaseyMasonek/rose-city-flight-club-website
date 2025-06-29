import {Stack, Typography, Divider, Button, Box} from "@mui/material";
import Link from "next/link";
import {getUser} from "@/app/lib/dal";
import {logout} from "@/app/lib/actions/auth";

function LoginButton() {
    return (
        <Link href={'/login'} className="w-full">
            <Button variant='outlined' color='secondary' className="float-right" >
                Log in
            </Button>
        </Link>
    )
}

function LogoutButton() {
    return (
        <Box className="w-full">
            <Button variant='outlined' color='secondary' className="float-right" onClick={logout} >
                Log Out
            </Button>
        </Box>
    )
}

export default async function Header() {
    let user

    try {
        user = await getUser();
    } catch (error) {
        user = null
    }

    return (
        <Stack spacing={1}>
            <Stack direction="row">
                <Link href={'/'} className="w-1/2">
                    <Typography variant='h4'>
                        Rose City Flight Club
                    </Typography>
                </Link>
                { user?.id ? <LogoutButton /> :<LoginButton />}
            </Stack>
            <Divider />
        </Stack>
    )
}