import { Box, Card, Chip, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function FileDrop({
  image,
  setImage,
  name,
}: {
  image: File | null;
  setImage: (image: File | null) => void;
  name: string;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop,
  });

  return (
    <Box>
      {!image && (
        <Card
          {...getRootProps()}
          variant="outlined"
          color="primary"
          sx={{
            width: "100%",
            textAlign: "center",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: isDragActive ? "rgba(0,81,84,0.3)" : "white",
            borderColor: isDragActive ? "rgba(0,81,84,1)" : "auto",
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload />
          &nbsp;&nbsp;
          {isDragActive ? (
            <Typography>Drop the image here...</Typography>
          ) : (
            <Typography>Upload {name} Image</Typography>
          )}
        </Card>
      )}
      {image && (
        <Card
          variant="outlined"
          color="primary"
          sx={{
            width: "100%",
            textAlign: "center",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,81,84,0.3)",
            borderColor: "rgba(0,81,84,1)",
          }}
        >
          <Chip
            label={image.name ? image.name : "image"}
            onDelete={() => {
              setImage(null);
            }}
          />
        </Card>
      )}
    </Box>
  );
}
