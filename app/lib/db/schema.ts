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
    }
}
