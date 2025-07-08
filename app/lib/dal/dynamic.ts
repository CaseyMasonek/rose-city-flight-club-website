import {db} from "@/app/lib/db/client";
import {Database} from "@/app/lib/db/schema";
import {cache} from "react";

const { ref } = db.dynamic
type possibleColumns = keyof Database["users"] | keyof Database["wines"]

export const getColumn = async (tableName: keyof Database,columnName: possibleColumns) => {
    //columnName = columnName as keyof Database[typeof tableName];

    const rows = await db
        .selectFrom(tableName)
        //@ts-ignore
        .select([ref<possibleColumns>(columnName)])
        .distinct()
        .where(columnName,'!=','')
        .execute()

    //@ts-ignore
    return rows.map(row => row[columnName] as possibleColumns)
}