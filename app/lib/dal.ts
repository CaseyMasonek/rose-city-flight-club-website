import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import {cache} from "react";
import {redirect} from "next/navigation";
import {db} from "@/app/lib/db";

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