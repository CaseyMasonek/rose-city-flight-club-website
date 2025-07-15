import {Box, CircularProgress, Typography} from "@mui/material";
import WinesTableWrapper from "@/app/components/admin/wines/wines-table-wrapper";
import { Suspense } from "react";


export default function Page() {
    return (
        <Box sx={{
            width: "100%",
            height: "100%"
        }}>
            <Typography variant={'h3'}>
                All Wines
            </Typography>
            <Suspense fallback={(
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <CircularProgress />
                </Box>
            )}>
                <WinesTableWrapper />
            </Suspense>
        </Box>
    )
}