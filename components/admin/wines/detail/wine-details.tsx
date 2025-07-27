"use client";

import { Wine } from "@/lib/types/wines";
import {
  Box,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Skeleton,
  Switch,
  Typography,
  Link
} from "@mui/material";
import Image from "next/image";
import { Suspense, useState } from "react";
import { titleCase } from "@/lib/utils";
import NextLink from "next/link";

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

  function isJson(str:string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  const [showUnset,setShowUnset] = useState(false)

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
                height: "80vh",
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
          <ul style={{
            height: '67vh',
            overflowY: 'auto'
          }}>
            {Object.entries(wine).map(([key, val]) => {
              if (['id','image_url','back_image_url', 'name'].includes(key)) return null;

              if (val == "[]" || val == "" || val == null) {
                if (!showUnset) return null

                return (
                  <li className="text-gray-300">
                    {titleCase(key.toString())}: Unset
                  </li>
                );
              }

              if (isJson(val.toString()) && Array.isArray(JSON.parse(val.toString()))) {
                const array = JSON.parse(val.toString()) as string[]

                return (
                  <li>
                    {titleCase(key.toString())}:{" "}
                    {array?.map((value) => (
                      <Chip label={value} />
                    ))}
                  </li>
                );
              }

              return (
                <li>
                  {titleCase(key.toString())}: {val?.toString()}
                </li>
              );
            })}
          </ul>
          <br />
        </Box>
        <FormControl>
            <FormLabel>
              Show empty values
            </FormLabel>
            <Switch onChange={(_,checked) => setShowUnset(checked)} />
          </FormControl>
      </Box>
    </Box>
  );
}
