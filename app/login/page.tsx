import {Box, Typography, Stack, Link} from '@mui/material';
import NextLink from 'next/link'
import LoginForm from "@/app/ui/login/login-form";

export default function Page() {
    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant='h4'>
                    Log in
                </Typography>
                <NextLink href="/signup">
                    <Link>
                        Don't have an account?
                    </Link>
                </NextLink>
                <LoginForm />
            </Stack>
        </Box>
    )
}