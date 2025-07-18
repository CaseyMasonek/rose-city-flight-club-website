import {Box} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function LoggedOutHeader() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Link href="/">
                <Image src="/logo_green.png" alt="logo" width={700} height={249} style={{ width: 300 }} />
            </Link>
        </Box>
    )
}