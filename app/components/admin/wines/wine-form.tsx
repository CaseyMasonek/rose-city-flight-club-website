"use client";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { wineFormOptions } from "@/app/lib/types/form-options";
import { titleCase } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import {
  handleCreateWine,
  uploadImage,
  handleUpdateWine,
} from "@/app/lib/admin/actions";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { Wine } from "@/app/lib/types/wines";

export default function WineForm({
  options,
  data,
  defaultImage,
  id,
}: {
  options: wineFormOptions;
  data?: Wine;
  defaultImage?: File;
  id?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const firstBoxRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState(
    data?.tags ? JSON.parse(data.tags) : []
  );
  const [selectedVarietals, setSelectedVarietals] = useState([]);
  const [addAnother, setAddAnother] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
    }
  }, [defaultImage]);

  const fields: {
    field: keyof wineFormOptions;
    multiple: boolean;
    multiVal?: string[];
    dropdown?: boolean;
  }[] = [
    { field: "name", multiple: false },
    { field: "vintage", multiple: false },
    { field: "producer", multiple: false },
    { field: "type", multiple: false },
    { field: "varietals", multiple: true, multiVal: selectedVarietals },
    { field: "country", multiple: false },
    { field: "region", multiple: false },
    { field: "subregion", multiple: false },
    { field: "appellation", multiple: false },
    { field: "vineyard", multiple: false },
    { field: "designation", multiple: false },
    { field: "distributor", multiple: false },
    { field: "inventory_status", multiple: false, dropdown: true },
    { field: "tags", multiple: true, multiVal: selectedTags },
  ];

  const emptyForm: Wine = {
    id: "",
    created_at: new Date(),
    notes: "",
    name: "",
    vintage: "",
    type: "",
    varietals: "",
    country: "",
    region: "",
    subregion: "",
    appellation: "",
    vineyard: "",
    designation: "",
    distributor: "",
    producer: "",
    inventory_status: "TBD", // or any other default value
    tags: "",
    image_url: null,
  };

  const [formValues, setFormValues] = useState<Wine>(data ? data : emptyForm);

  /**
   * Create or update wine on form submit
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let image_url: string | null = null;

    console.log(image ? image.name : null);

    if (image && image != defaultImage) {
      image_url = await uploadImage(image);
    }

    const form = formRef.current!;

    const formData = new FormData(form);

    const data = {
      notes: formData.get("notes") as string,
      name: formData.get("name") as string,
      vintage: formData.get("vintage") as string,
      type: formData.get("type") as string,
      varietals: JSON.stringify(selectedVarietals),
      country: formData.get("country") as string,
      region: formData.get("region") as string,
      subregion: formData.get("subregion") as string,
      appellation: formData.get("appellation") as string,
      vineyard: formData.get("vineyard") as string,
      designation: formData.get("designation") as string,
      distributor: formData.get("distributor") as string,
      producer: formData.get("producer") as string,
      inventory_status: formData.get("inventory_status") as
        | "In Stock"
        | "Out of Stock"
        | "TBD"
        | "Archived",
      tags: JSON.stringify(selectedTags),
      image_url: image_url,
    };

    if (id) {
      await handleUpdateWine(data, id);
    } else {
      await handleCreateWine(data);
    }

    if (!addAnother) {
      router.push("/admin");
    } else {
      setFormValues(emptyForm);
      setAddAnother(false);
      setSelectedTags([]);
      setSelectedVarietals([]);
      setImage(null);
      firstBoxRef.current!.focus();
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: "100%",
      }}
    >
      <form
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={(e) => handleSubmit(e)}
        ref={formRef}
      >
        <Stack spacing={2} className={"w-full"}>
          {fields.map((field, i) => (
                <Autocomplete
                  freeSolo
                  defaultValue={
                    data
                      ? field.multiple
                        ? JSON.parse(data[field.field])
                        : [data[field.field] as string]
                      : []
                  }
                  value={
                    field.multiple ? field.multiVal : formValues![field.field]
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant={"filled"}
                      label={titleCase(field.field)}
                      name={field.field}
                      id={field.field}
                      inputRef={i == 0 ? firstBoxRef : null}
                      className={i.toString()}
                      value={formValues[field.field]}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setFormValues((prevState) => ({
                          ...prevState!,
                          [name]: value,
                        }));
                      }}
                    />
                  )}
                  options={options[field.field]}
                  key={i}
                  multiple={field.multiple}
                  onChange={(_, newValue) => {
                    if (!newValue) {
                      newValue = [];
                    }

                    if (!field.multiple) {
                      setFormValues((prevState) => ({
                        ...prevState!,
                        [field.field!]: newValue,
                      }));
                      console.log(formValues);
                    }

                    if (!Array.isArray(newValue)) {
                      newValue = [newValue];
                    }

                    switch (field.field) {
                      case "tags":
                        // @ts-ignore
                        setSelectedTags(newValue);
                        return;
                      case "varietals":
                        // @ts-ignore
                        setSelectedVarietals(newValue);
                        return;
                    }
                  }}
                />
          ))}
          <TextField
            name={"notes"}
            multiline={true}
            value={formValues.notes}
            variant="filled"
            label={"Notes"}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormValues((prevState) => ({
                ...prevState!,
                [name]: value,
              }));
            }}
          />

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
                <Typography>Upload Image</Typography>
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                width: id ? "100%" : "33%",
              }}
              onClick={() => setAddAnother(false)}
            >
              Save
            </Button>
            {!id && (
              <Button
                variant="contained"
                color="inherit"
                type="submit"
                sx={{
                  width: "66%",
                }}
                onClick={() => setAddAnother(true)}
              >
                Save and Add Another
              </Button>
            )}
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
