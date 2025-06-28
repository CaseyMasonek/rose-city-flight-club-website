import {Stack, Typography, Divider} from "@mui/material";
import Link from "next/link";

export default function Header() {
    return (
        <Stack spacing={10} direction="row">
            <Link href={'/'}>
                <Typography variant='h4'>
                    Rose City Flight Club
                </Typography>
            </Link>
            <Divider />
        </Stack>
    )
}