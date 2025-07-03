import {Box, Link, Stack, Typography} from "@mui/material";
import NextLink from "next/link";

export default function Footer() {
    return (
        <Box sx={{
            marginTop: 'auto',
            width: '100%',
            textAlign: 'center',
        }}>
            <Box>
                <Stack>
                    <Typography>
                        You must be 21 or older to purchase and enjoy
                        our wines. Please sip responsibly!
                    </Typography>
                    <NextLink href="mailto:cheers@rosecityflightclub.com">
                        <Link sx={{}}>
                            cheers@rosecityflightclub.com
                        </Link>
                    </NextLink>
                </Stack>
            </Box>
            <Typography sx={{
                float: 'right',
            }}>
                @ 2025 Rose City Flight Club
            </Typography>
        </Box>
    )
}