"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { wineFormOptions } from "@/app/lib/types/form-options";
import { useRouter } from "next/navigation";
import {
  handleCreateWine,
  uploadImage,
  handleUpdateWine,
  getWineImageUrls,
} from "@/app/lib/admin/(wines)/actions";
import { Wine } from "@/app/lib/types/wines";
import FileDrop from "../../common/file-drop";
import InputField from "@/app/components/admin/wines/input-field";

export default function WineForm({
  options,
  data,
  defaultFrontImage,
  defaultBackImage,
  id,
}: {
  options: wineFormOptions;
  data?: Wine;
  defaultFrontImage?: File;
  defaultBackImage?: File;
  id?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const firstBoxRef = useRef<HTMLInputElement>(null);

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>(
    data?.tags ? JSON.parse(data.tags) : []
  );
  const [selectedVarietals, setSelectedVarietals] = useState<string[]>(
    data?.varietals ? JSON.parse(data.varietals) : []
  );
  const [addAnother, setAddAnother] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    data?.type ? JSON.parse(data.type) : []
  );

  useEffect(() => {
    if (defaultFrontImage) {
      setFrontImage(defaultFrontImage);
    }
  }, [defaultFrontImage]);

  useEffect(() => {
    if (defaultBackImage) {
      setBackImage(defaultBackImage);
    }
  }, [defaultBackImage]);

  const fields: {
    field: keyof wineFormOptions;
    type: "multiple" | "single" | "number" | "dropdown" | "autocomplete";
    multiVal?: string[];
    setMultiVal?: (values: string[]) => void;
  }[] = [
    { field: "name", type: "autocomplete" },
    { field: "vintage", type: "dropdown" },
    { field: "producer", type: "autocomplete" },
    {
      field: "type",
      type: "multiple",
      multiVal: selectedTypes,
      setMultiVal: setSelectedTypes,
    },
    {
      field: "varietals",
      type: "multiple",
      multiVal: selectedVarietals,
      setMultiVal: setSelectedVarietals,
    },
    { field: "country", type: "autocomplete" },
    { field: "region", type: "autocomplete" },
    { field: "subregion", type: "autocomplete" },
    { field: "appellation", type: "autocomplete" },
    { field: "vineyard", type: "autocomplete" },
    { field: "designation", type: "autocomplete" },
    { field: "distributor", type: "autocomplete" },
    { field: "inventory_status", type: "dropdown" },
    {
      field: "tags",
      type: "multiple",
      multiVal: selectedTags,
      setMultiVal: setSelectedTags,
    },
    { field: "wholesale_cost", type: "number" },
    { field: "retail_cost", type: "number" },
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
    retail_cost: "",
    wholesale_cost: "",
    image_url: null,
    back_image_url: null,
  };

  const [formValues, setFormValues] = useState<Wine>(data ? data : emptyForm);

  /**
   * Create or update wine on form submit
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let image_url: string | null = null;
    let back_image_url: string | null = null;

    if (id) {
      const { front, back } = (await getWineImageUrls(id))!;
      if (front) image_url = front;
      if (back) back_image_url = back;
    }

    if (frontImage && frontImage != defaultFrontImage) {
      image_url = await uploadImage(frontImage);
    }

    if (backImage && backImage != defaultBackImage) {
      back_image_url = await uploadImage(backImage);
    }

    const form = formRef.current!;

    const formData = new FormData(form);

    const data = {
      notes: formData.get("notes") as string,
      name: formData.get("name") as string,
      vintage: formData.get("vintage") as string,
      type: JSON.stringify(selectedTypes),
      varietals: JSON.stringify(selectedVarietals),
      country: formData.get("country") as string,
      region: formData.get("region") as string,
      subregion: formData.get("subregion") as string,
      appellation: formData.get("appellation") as string,
      vineyard: formData.get("vineyard") as string,
      designation: formData.get("designation") as string,
      distributor: formData.get("distributor") as string,
      producer: formData.get("producer") as string,
      wholesale_cost: (formData.get("wholesale_cost") as string) || null,
      retail_cost: (formData.get("retail_cost") as string) || null,
      inventory_status: formData.get("inventory_status") as
        | "In Stock"
        | "Out of Stock"
        | "TBD"
        | "Archived",
      tags: JSON.stringify(selectedTags),
      image_url: image_url,
      back_image_url: back_image_url,
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
      setSelectedTypes([]);
      setFrontImage(null);
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
            <InputField
              key={i}
              field={field}
              options={options[field.field]}
              formValues={formValues}
              setFormValues={setFormValues}
              data={data}
              index={i}
              firstBoxRef={firstBoxRef}
              multiVal={field.multiVal}
              setMultiVal={field.setMultiVal}
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

          <FileDrop image={frontImage} setImage={setFrontImage} name="Front" />
          <FileDrop image={backImage} setImage={setBackImage} name="Back" />

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
