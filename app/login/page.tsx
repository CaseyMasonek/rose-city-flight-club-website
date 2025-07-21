import { Box, Stack } from "@mui/material";
import LoginForm from "@/app/components/login/login-form";

export default function Page() {
  const horizontallyCentered = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          marginY: "5%",
        }}
        spacing={10}
      >
        <Box sx={horizontallyCentered}>
          <LoginForm />
        </Box>
      </Stack>
    </Box>
  );
}
