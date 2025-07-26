import {Box, Typography, Stack, Grid, Link} from '@mui/material';
import SignupForm from "@/components/signup/signup-form";
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
                flexDirection: 'column',
                justifyContent: 'space-around',
            }} spacing={10}>
                <Box sx={horizontallyCentered}>
                    <SignupForm />
                </Box>
            </Stack>
        </Box>
    )
}