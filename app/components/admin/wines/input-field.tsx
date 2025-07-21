"use client";

import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { titleCase } from "@/app/lib/utils";

type InputFieldProps = {
  field: {
    field: string;
    type: "multiple" | "single" | "number" | "dropdown" | "autocomplete";
    multiVal?: string[];
  };
  options: string[];
  formValues: any;
  setFormValues: (values: any) => void;
  data?: any;
  index: number;
  firstBoxRef?: React.RefObject<HTMLInputElement | null>;
  setMultiVal?: (values: string[]) => void;
};

export default function InputField({
  field,
  options,
  formValues,
  setFormValues,
  data,
  index,
  firstBoxRef,
  setMultiVal,
}: InputFieldProps) {

  if (field.type === "number") {
    return (
      <TextField
        variant={"filled"}
        label={titleCase(field.field)}
        name={field.field}
        id={field.field}
        inputRef={index === 0 ? firstBoxRef : null}
        className={index.toString()}
        value={formValues[field.field] || ""}
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

  if (field.type === "dropdown") {
    return (
      <FormControl variant={"filled"}>
        <InputLabel id={`${field.field}-label`}>{titleCase(field.field)}</InputLabel>
        <Select
          variant={"filled"}
          label={titleCase(field.field)}
          name={field.field}
          id={field.field}
          value={formValues[field.field]}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormValues((prevState: any) => ({
              ...prevState,
              [name]: value,
            }));
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <Autocomplete
      freeSolo
      defaultValue={
        data
          ? field.type === "multiple"
            ? Array.isArray(data[field.field])
              ? data[field.field]
              : JSON.parse(data[field.field])
            : [data[field.field] as string]
          : []
      }
      value={
        field.type === "multiple" ? field.multiVal : formValues[field.field]
      }
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
      multiple={field.type === "multiple"}
      onChange={(_, newValue) => {
        if (!newValue) {
          newValue = [];
        }

        if (field.type !== "multiple") {
          setFormValues((prevState: any) => ({
            ...prevState,
            [field.field]: newValue,
          }));
        }

        if (!Array.isArray(newValue)) {
          newValue = [newValue];
        }

        if (setMultiVal) {
          setMultiVal(newValue as string[]);
        }
      }}
    />
  );
}
