import {Generated} from "kysely";

export interface Database {
    users: {
        id: Generated<string>
        password: string
        first_name: string
        last_name: string
        email: string
        billing_address: string | null
        delivery_address: string | null
        phone: string | null
        is_admin: boolean
        notes: string
        created_at: Generated<Date>
    }
}
