import {Generated} from "kysely";
import dayjs from "dayjs";

export type Wine = {
    id: string
    created_at: Date
    vintage: string
    type: string
    name: string
    producer: string
    varietals: string
    designation: string
    vineyard: string
    country: string
    region: string
    subregion: string
    appellation: string
    distributor: string
    notes: string
    inventory_status: "In Stock" | "Out of Stock" | "Archived" | "TBD"
    tags: string
}