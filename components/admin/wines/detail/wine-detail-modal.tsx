"use client";

import { Wine } from "@/lib/types/wines";
import { Modal, Typography, Card, Box, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import WineDetails from "./wine-details";
import { useRouter } from "next/navigation";

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
  const router = useRouter()

  function handleClose() {
    router.back()
  }
  return (

      <Modal
        open={true}
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          width: "90%"
        }}
        onClose={handleClose}
      >
        <Card variant="outlined" sx={{
            width: "100%",
            height: "90vh",
            p: 2,
        }}>
          <Button variant="outlined" sx={{
            position: 'absolute',
            right: 20,
            width: 25,
          }}
          onClick={handleClose}
          >
            X
          </Button>
          <WineDetails wine={wine} images={images} />
        </Card>
      </Modal>
  );
}
