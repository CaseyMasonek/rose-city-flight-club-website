import { Kysely } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'
import {User} from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!,{ssl:"require"})

interface Database {
    users: User
}

export const db = new Kysely<Database>({
    dialect: new PostgresJSDialect({
        postgres: sql,
    }),
})