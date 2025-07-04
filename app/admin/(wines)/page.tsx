import {Box, Typography} from "@mui/material";
import {verifySession} from "@/app/lib/dal/users";
import {redirect} from "next/navigation";
import NewButton from "@/app/components/admin/new-button";

export default async function Page() {
    return (
        <Box>
            <Typography>
                Admin page
            </Typography>
        </Box>
    )
}