import { Kysely, Generated } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'
import {User} from "@/app/lib/types/user"

const sql = postgres(process.env.POSTGRES_URL!,{ssl:"require"})

export interface Database {
    users: {
        id: Generated<string>
        username: string
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

export const db = new Kysely<Database>({
    dialect: new PostgresJSDialect({
        postgres: sql,
    }),
})