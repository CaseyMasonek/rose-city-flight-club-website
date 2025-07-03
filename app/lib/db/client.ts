import { Kysely } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'
import {Database} from "@/app/lib/db/schema";

const sql = postgres(process.env.POSTGRES_URL!,{ssl:"require"})

export const db = new Kysely<Database>({
    dialect: new PostgresJSDialect({
        postgres: sql,
    }),
})