import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/auth/session'
import {cache} from "react";
import {redirect} from "next/navigation";
import {db} from "@/app/lib/db/client";
import {Database} from "@/app/lib/db/schema";
import {Insertable, ReferenceExpression} from "kysely";

/**
 * Make sure user is logged in
 */
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.id) {
        redirect('/login')
    }

    const userId : string = session.id.toString()

    return { isAuth: true, userId: userId, is_admin: session.is_admin }
})

/**
 * Get user data from session
 */
export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const id = session.userId

        const user = db
            .selectFrom('users')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst()

        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})

export const createUser = async (user:Insertable<Database['users']>) => {
    const created_user = await db
        .insertInto('users')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow()

    return created_user
}

export const verifyUniqueness = async (column:ReferenceExpression<Database, "users">,value:string) => {
    const isUnique = (await db
        .selectFrom('users')
        .selectAll()
        .where(column, '=', value)
        .execute()).length == 0

    return isUnique
}