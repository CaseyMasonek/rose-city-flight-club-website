"use client"

import {Autocomplete, Box, Button, Stack, TextareaAutosize, TextField} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {wineFormOptions} from "@/app/lib/types/form-options";
import {titleCase} from "@/app/lib/utils";
import {useRouter} from "next/navigation";
import {handleCreateWine} from "@/app/lib/admin/actions";

export default function WineForm({options}: {options: wineFormOptions}) {
    const formRef = useRef<HTMLFormElement>(null);
    const firstBox = useRef<HTMLInputElement>(null);

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

    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedVarietals, setSelectedVarietals] = useState([]);
    const [addAnother, setAddAnother] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        firstBox.current!.focus();

        if (!addAnother) {
            e.preventDefault()
        }

        const formData = new FormData(formRef.current!);

        await handleCreateWine({
            notes: formData.get('notes') as string,
            name: formData.get('name') as string,
            vintage: formData.get('vintage') as string,
            type: formData.get('type') as string,
            varietals: JSON.stringify(selectedVarietals),
            country: formData.get('country') as string,
            region: formData.get('region') as string,
            subregion: formData.get('subregion') as string,
            appellation: formData.get('appellation') as string,
            vineyard: formData.get('vineyard') as string,
            designation: formData.get('designation') as string,
            distributor: formData.get('distributor') as string,
            producer: formData.get('producer') as string,
            inventory_status: formData.get('inventory_status') as "In Stock" | "Out of Stock" | "TBD" | "Archived",
            tags: JSON.stringify(selectedTags),
        })

        if (!addAnother) {
            router.push('/admin')
        }
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
                                id={field.field}
                                ref={i == 0 ? firstBox : null}
                            />
                        } options={options[field.field]}
                            key={i}
                          multiple={field.multiple}
                            onChange={(e,newValue) => {
                                if (!newValue) {
                                    newValue = []
                                }

                                if (!Array.isArray(newValue)) {
                                    newValue = [newValue]
                                }

                                switch (field.field) {
                                    case "tags":
                                        // @ts-ignore
                                        setSelectedTags(newValue)
                                        return
                                    case "varietals":
                                        // @ts-ignore
                                        setSelectedVarietals(newValue)
                                }
                            }}
                        />
                    ))}
                    <TextField
                        name={"notes"}
                        multiline={true}
                        variant="filled"
                        label={"Notes"}
                    />

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Button variant="contained" color="primary" type="submit" sx={{
                            width: "33%",
                        }} onClick={() => setAddAnother(false)}>
                            Save
                        </Button>
                        <Button variant="contained" color="inherit" type="submit" sx={{
                            width: "66%",
                        }} onClick={() => setAddAnother(true)}>
                            Save and Add Another
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Box>
    )
}