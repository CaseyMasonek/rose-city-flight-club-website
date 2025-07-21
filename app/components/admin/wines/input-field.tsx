"use client";

import { Autocomplete, TextField } from "@mui/material";
import { titleCase } from "@/app/lib/utils";

type InputFieldProps = {
  field: {
    field: string;
    multiple: boolean;
    multiVal?: string[];
    dropdown?: boolean;
  };
  options: string[];
  formValues: any;
  setFormValues: (values: any) => void;
  data?: any;
  index: number;
  firstBoxRef?: React.RefObject<HTMLInputElement | null>;
  setSelectedTags?: (tags: string[]) => void;
  selectedTags?: string[];
  selectedVarietals?: string[];
  setSelectedVarietals?: (varietals: string[]) => void;
}

export default function InputField({
  field,
  options,
  formValues,
  setFormValues,
  data,
  index,
  firstBoxRef,
  setSelectedTags,
  setSelectedVarietals,
}: InputFieldProps) {
  // For cost fields, use a simple TextField instead of Autocomplete
  if (field.field === 'wholesale_cost' || field.field === 'retail_cost') {
    return (
      <TextField
        variant={"filled"}
        label={titleCase(field.field)}
        name={field.field}
        id={field.field}
        inputRef={index === 0 ? firstBoxRef : null}
        className={index.toString()}
        value={formValues[field.field] || ''}
        type="number"
        onChange={(e) => {
          const { name, value } = e.target;
          setFormValues((prevState: any) => ({
            ...prevState,
            [name]: value,
          }));
        }}
      />
    );
  }

  return (
    <Autocomplete
      freeSolo
      defaultValue={
        data
          ? field.multiple
            ? JSON.parse(data[field.field])
            : [data[field.field] as string]
          : []
      }
      value={field.multiple ? field.multiVal : formValues[field.field]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={"filled"}
          label={titleCase(field.field)}
          name={field.field}
          id={field.field}
          inputRef={index === 0 ? firstBoxRef : null}
          className={index.toString()}
          value={formValues[field.field]}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormValues((prevState: any) => ({
              ...prevState,
              [name]: value,
            }));
          }}
        />
      )}
      options={options}
      key={index}
      multiple={field.multiple}
      onChange={(_, newValue) => {
        if (!newValue) {
          newValue = [];
        }

        if (!field.multiple) {
          setFormValues((prevState: any) => ({
            ...prevState,
            [field.field]: newValue,
          }));
        }

        if (!Array.isArray(newValue)) {
          newValue = [newValue];
        }

        switch (field.field) {
          case "tags":
            if (setSelectedTags) {
              setSelectedTags(newValue as string[]);
            }
            return;
          case "varietals":
            if (setSelectedVarietals) {
              setSelectedVarietals(newValue as string[]);
            }
            return;
        }
      }}
    />
  );
} 