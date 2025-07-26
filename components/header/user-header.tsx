import {Divider, Stack} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {User} from "@/lib/types/user";
import HeaderAvatar from "@/components/header/header-avatar";

export default function UserHeader({user}:{user:User}) {
    return (
        <Stack spacing={1}>
            <Stack direction="row" sx={{ px: 3, height: "5vh" }}>
                <Link href="/admin">
                    <Image src="/logo_green.png" alt="logo" width={700} height={249} style={{ width: 136 }} />
                </Link>
                <Stack direction="row" sx={{
                    display: "flex",
                    justifyContent: "right",
                    width: "100%",
                }} spacing={5}>
                    <HeaderAvatar user={user} />
                </Stack>
            </Stack>
            <Divider />
        </Stack>
    )
}
