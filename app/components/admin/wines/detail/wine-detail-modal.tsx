"use client";

import { Wine } from "@/app/lib/types/wines";
import { Modal, Typography, Card, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import WineDetails from "./wine-details";

export default function WineDetailModal({
  wine,
  images,
}: {
  wine: Wine;
  images: {
    front: string | null;
    back: string | null;
  } | null;
}) {
  const [open, setOpen] = useState(true);

  return (

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
        }}>
          <WineDetails wine={wine} images={images} />
        </Card>
      </Modal>
  );
}
