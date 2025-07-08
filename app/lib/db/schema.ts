import {Generated} from "kysely";

export interface Database {
    users: {
        id: Generated<string>
        password: string
        first_name: string
        last_name: string
        email: string
        billing_address: object | null
        delivery_address: object | null
        phone: string | null
        is_admin: boolean
        notes: string
        created_at: Generated<Date>
        birth_date: Date
    }
    wines: {
        id: Generated<string>
        created_at: Generated<Date>
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
}
