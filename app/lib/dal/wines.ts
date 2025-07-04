import {db} from "@/app/lib/db/client";
import {Database} from "@/app/lib/db/schema";
import {cache} from "react"

export const getWines = cache(async () => {
    return db
        .selectFrom('wines')
        .selectAll()
        .execute()
})