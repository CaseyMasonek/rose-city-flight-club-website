import {Stack, Typography, Divider, Button, Box} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {getUser} from "@/app/lib/dal/users";
import LoggedOutHeader from "@/app/ui/header/logged-out-header";
import LoggedInHeader from "@/app/ui/header/logged-in-header";

export default async function Header() {
    const user = await getUser().catch(() => null);

    return user ? <LoggedInHeader /> : <LoggedOutHeader />;
}
