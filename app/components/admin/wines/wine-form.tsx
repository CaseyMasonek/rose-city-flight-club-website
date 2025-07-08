"use client"

import {Autocomplete, Box, Button, Stack, TextField} from "@mui/material";
import {useRef} from "react";
import {wineFormOptions} from "@/app/lib/types/form-options";
import {titleCase} from "@/app/lib/utils";
import {useRouter} from "next/navigation";

export default function WineForm({options}: {options: wineFormOptions}) {
    const formRef = useRef<HTMLFormElement>(null);

    const router = useRouter();

    const fields : {field:(keyof wineFormOptions),multiple:boolean}[] = [
        { field: "name", multiple: false },
        { field: "vintage", multiple: false },
        { field: "type", multiple: false },
        { field: "varietals", multiple: true },
        { field: "country", multiple: false },
        { field: "region", multiple: false },
        { field: "subregion", multiple: false },
        { field: "appellation", multiple: false },
        { field: "vineyard", multiple: false },
        { field: "designation", multiple: false },
        { field: "distributor", multiple: false },
        { field: "producer", multiple: false },
        { field: "inventory_status", multiple: false },
        { field: "tags", multiple: true }
    ]


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(formRef.current!);

        console.log(formData)
    }

    return (
        <Box
            sx={{
                maxWidth: 600,
                width: "100%",
            }}
        >
            <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
                <Stack spacing={2} className={"w-full"}>
                    {fields.map((field, i) => (
                        <Autocomplete
                            freeSolo
                            renderInput={(params) =>
                            <TextField
                                {...params}
                                variant={'filled'}
                                label={titleCase(field.field)}
                                name={field.field}
                            />
                        } options={options[field.field]}
                            key={i}
                          multiple={field.multiple}
                        />
                    ))}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Button variant="contained" color="primary" type="submit" sx={{
                            width: "33%",
                        }}>
                            Save
                        </Button>
                        <Button variant="contained" color="inherit" type="submit" sx={{
                            width: "66%",
                        }} onClick={() => router.refresh()}>
                            Save and Add Another
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Box>
    )
}