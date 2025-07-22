"use client"

import { Wine } from "@/app/lib/types/wines";
import { Modal, Typography, Card, Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();
  const [open,setOpen] = useState(true)

  return (
    <Modal
      open={open}
      sx={{
        alignSelf: "center",
        justifySelf: "center",
        width: "90%",
      }}
      onClose={() => setOpen(false)}
    >
      <Card variant="outlined">
        <Typography variant={"h4"}>{wine.name}</Typography>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant={"h6"}>Cost Information</Typography>
          <Typography>
            Wholesale Cost:{" "}
            {wine.wholesale_cost
              ? `$${parseFloat(wine.wholesale_cost).toFixed(2)}`
              : "Not set"}
          </Typography>
          <Typography>
            Retail Cost:{" "}
            {wine.retail_cost
              ? `$${parseFloat(wine.retail_cost).toFixed(2)}`
              : "Not set"}
          </Typography>
        </Box>
        {images?.front && (
          <Image src={images.front} alt={wine.name} height={500} width={500} />
        )}
        {images?.back && (
          <Image src={images.back} alt={wine.name} height={500} width={500} />
        )}
      </Card>
    </Modal>
  );
}
