import {Box, Typography, Stack} from '@mui/material';
import LoginForm from "@/app/ui/login/login-form";

export default function Page() {
    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant='h4'>
                    Log in
                </Typography>
                <LoginForm />
            </Stack>
        </Box>
    )
}