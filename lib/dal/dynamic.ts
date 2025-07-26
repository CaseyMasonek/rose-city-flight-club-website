import {db} from "@/lib/db/client";
import {Database} from "@/lib/db/schema";

const { ref } = db.dynamic
type possibleColumns = keyof Database["users"] | keyof Database["wines"]

export const getColumn = async (tableName: keyof Database,columnName: possibleColumns) => {
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