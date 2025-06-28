import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import {cache} from "react";
import {redirect} from "next/navigation";
import postgres from "postgres";
import {User} from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'}); // Connect to DB

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.id) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId, is_admin: session.is_admin }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const id = session.userId

        // @ts-ignore
        const data = await sql<User[]>`SELECT * FROM users WHERE id = ${id}`

        return data[0]
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})