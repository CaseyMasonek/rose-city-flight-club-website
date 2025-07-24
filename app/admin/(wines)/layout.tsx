import { isValidElement, ReactNode } from "react";
import { Box, Modal } from "@mui/material";

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <Box>
      {children}
      {modal}
    </Box>
  );
}
