import { Wine } from "@/lib/types/wines";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

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
  return (
    <Box
      sx={{
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Box>
        {images?.front && (
          <Image src={images.front} alt={wine.name} height={500} width={500} />
        )}
        {images?.back && (
          <Image src={images.back} alt={wine.name} height={500} width={500} />
        )}
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box sx={{
        width: '50%'
      }}>
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
