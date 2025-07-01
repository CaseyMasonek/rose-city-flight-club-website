import {Stack, Typography, Divider, Button, Box} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {getUser} from "@/app/lib/dal/users";
import {logout} from "@/app/lib/auth/actions";

export default async function Header() {
    const user = await getUser().catch(() => null);

    if (!user) {
        return (
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Link href="/">
                    <Image src="/logo_green.png" alt="logo" width={700} height={249} className={'w-75'} />
                </Link>
            </Box>
        )
    }

    return (
        <Stack spacing={1}>
            <Stack direction="row">
                <Link href={'/'}>
                    <Typography variant='h4' sx={{ width: '200%' }}>
                        Rose City Flight Club
                    </Typography>
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
            <Button variant='outlined' color='secondary' sx={{float:'right'}} onClick={logout} >
                Log Out
            </Button>
        </Box>
    )
}