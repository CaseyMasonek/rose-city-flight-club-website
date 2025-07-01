import {Box, Typography, Stack, Grid, Link} from '@mui/material';
import LoginForm from "@/app/ui/login/login-form";
import NextLink from "next/link"

export default function Page() {
    const horizontallyCentered = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }

    return (
        <Box>
            <Stack sx={{
                display: 'flex',
                width: '100%',
                height: '83dvh',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }} spacing={10}>
                <Box sx={horizontallyCentered}>
                    <LoginForm />
                </Box>
                <Box sx={horizontallyCentered}>
                    <Stack>
                        <Typography>
                            You must be 21 or older to purchase and enjoy
                            our wines. Please sip responsibly!
                        </Typography>
                        <NextLink href="/login">
                            <Link sx={horizontallyCentered}>
                                cheers@rosecityflightclub.com
                            </Link>
                        </NextLink>
                    </Stack>
                </Box>
            </Stack>
            <Typography sx={{
                float: 'right',
            }}>
                @ 2025 Rose City Flight Club
            </Typography>
        </Box>
    )
}