import {Typography} from "@mui/material";
import {verifySession} from "@/app/lib/dal";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await verifySession();
    const is_admin = session?.is_admin;

    if (is_admin == null) {
        redirect('/login')
    } else if (!is_admin) {
        redirect('/')
    }

    return (
        <Typography>
            Admin page
        </Typography>
    )
}