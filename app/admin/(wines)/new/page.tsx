import {Box, Stack, CircularProgress} from '@mui/material';
import WineFormWrapper from '@/components/admin/wines/wine-form-wrapper';
import { Suspense } from 'react';

export default async function Page() {
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
                    <Suspense fallback={<CircularProgress />}>
                        <WineFormWrapper />
                    </Suspense>
                </Box>
            </Stack>
        </Box>
    )
}