"use client"

import { Modal, CircularProgress, Card, Box } from "@mui/material";
import { useState } from "react";

export default function WineDetailModalSkeleton() {
    const [open, setOpen] = useState(true);

    return (
        <Box sx={{
            width: "100%",
            height: "100dvh"
        }}>
          <Modal
            open={open}
            sx={{
              alignSelf: "center",
              justifySelf: "center",
              width: "90%"
            }}
            onClose={() => setOpen(false)}
          >
            <Card variant="outlined" sx={{
                width: "100%",
                height: "90vh",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
              <CircularProgress />
            </Card>
          </Modal>
        </Box>
      );
}