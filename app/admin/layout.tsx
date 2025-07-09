import {Box} from "@mui/material";
import NewButton from "@/app/components/admin/new-button";
import {verifySession} from "@/app/lib/dal/users";
import {redirect} from "next/navigation";

export default async function Layout({children}:{children:React.ReactNode}) {
    const session = await verifySession();
    const is_admin = session?.is_admin;

    if (is_admin == null) {
        redirect('/login')
    } else if (!is_admin) {
        redirect('/')
    }

    return (
        <Box>
            <Box sx={{position: 'fixed', right:30, bottom:50, display: 'flex', justifyContent: 'right', height: 'auto', zIndex: 99}}>
                <NewButton />
            </Box>
            {children}
        </Box>
    )
}