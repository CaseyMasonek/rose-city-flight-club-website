"use client";

import { Wine } from "@/lib/types/wines";
import { Box, Divider, Pagination, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { Suspense, useState } from "react";

export default function WineDetails({
  wine,
  images,
}: {
  wine: Wine;
  images: {
    front: string | null;
    back: string | null;
  } | null;
}) {
  const [isFrontImage, setIsFrontImage] = useState(true);

  function handleChangeImage(newPage: number) {
    switch (newPage) {
      case 1:
        setIsFrontImage(true);
        return;
      case 2:
        setIsFrontImage(false);
        return;
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {(images?.front || images?.back) && (
        <>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: '80vh'
            }}
          >
            {images?.front &&
              ((images?.front && images.back && isFrontImage) ||
                !images.back) && (
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      width={400 / 3}
                      height={400}
                    />
                  }
                >
                  <Image
                    src={images.front}
                    alt={wine.name}
                    height={400 / 3}
                    width={400}
                  />
                </Suspense>
              )}
            {images?.back &&
              ((images?.front && images.back && !isFrontImage) ||
                !images.front) && (
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      width={400 / 3}
                      height={400}
                    />
                  }
                >
                  <Image
                    src={images.back}
                    alt={wine.name}
                    height={400 / 3}
                    width={400}
                  />
                </Suspense>
              )}
          </Box>
          {images?.front && images.back && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={2}
                  onChange={(_, page) => handleChangeImage(page)}
                  hideNextButton
                  hidePrevButton
                />
              </Box>
            )}
            </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
        </>
      )}
      <Box
        sx={{
          width: "50%",
        }}
      >
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
      </Box>
    </Box>
  );
}
