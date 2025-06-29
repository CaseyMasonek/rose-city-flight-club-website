import {Box, Typography} from "@mui/material";
import SignupForm from "@/app/ui/signup/signup-form";

export default function Page() {
    return (
        <Box>
            <Typography variant="h4">
                Sign up
            </Typography>
            <SignupForm />
        </Box>
    )
}