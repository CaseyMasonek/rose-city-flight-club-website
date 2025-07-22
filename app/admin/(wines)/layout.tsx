import { isValidElement, ReactNode } from "react";
import { Box, Modal } from "@mui/material";

export default function Layout({
  children,
  wine,
}: {
  children: ReactNode;
  wine: ReactNode;
}) {
  return (
    <Box>
      {children}
      {wine}
    </Box>
  );
}
