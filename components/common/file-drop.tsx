import { Box, Card, Chip, Typography, Modal, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useCallback, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import Image from "next/image";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "@/lib/utils";

export default function FileDrop({
  image,
  setImage,
  name,
}: {
  image: File | null;
  setImage: (image: File | null) => void;
  name: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const [open, setOpen] = useState(true);

  const imgRef = useRef<HTMLImageElement>(null)


  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    setOpen(true)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop,
  });

  async function handleSaveCrop() {
    setOpen(false)

    const img = await getCroppedImg(imgRef.current!,completedCrop!)

    setImage(img)
  }

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
              setPreviewUrl(null);
              setImage(null);
            }}
          />
        </Card>
      )}
      {previewUrl && (
        <Modal open={open}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography variant="h4">Please crop this image</Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={3 / 5}
                    onComplete={(c) => setCompletedCrop(c)}
                  >
                    <Image
                      src={previewUrl}
                      ref={imgRef}
                      width={250}
                      height={500}
                      alt={"Image you just uploaded"}
                    />
                  </ReactCrop>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button variant="contained" sx={{
                    width: '100%',
                    mt: 2
                  }} onClick={handleSaveCrop}>Save</Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
