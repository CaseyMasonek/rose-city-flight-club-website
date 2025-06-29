'use server'

import {LoginFormState, UserFormSchema} from "@/app/lib/definitions";
import { sha256 } from "js-sha256";
import {db} from '@/app/lib/db'
import {createSession, deleteSession} from "@/app/lib/session";
import {redirect} from "next/navigation";

// Trim sign up form schema for login schema
const AuthenticateUser = UserFormSchema.omit({ id: true, full_name: true, email: true, billing_address: true, delivery_address: true, });

/**
 * Authenticate user
 * @param formState
 * @param formData
 */
export async function login(formState: LoginFormState, formData: FormData) {
    // Get form data
    const username = formData.get("username")!.toString().toLowerCase();
    const password = formData.get("password");

    // Validate form data
    const validatedFields = AuthenticateUser.safeParse({
        username: username,
        password: password,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Encrypt password to check with the database
    const encryptedPassword = sha256(password!.toString());

    // Check is user exists in database
    //const data = await sql<User[]>`SELECT * FROM users WHERE lower(username) = ${username} AND password = ${encryptedPassword}`;
    const data = await db
        .selectFrom('users')
        .selectAll()
        .where('username','=',username)
        .where('password','=',encryptedPassword)
        .execute()

    // Throw error if not
    if (data.length == 0) {
        return {
            errors: {
                password:["Incorrect username or password"],
            },
        }
    }

    const user = data[0]

    await createSession(user); // Add user to session

    if (user.is_admin) {
        redirect('/admin');
    } else {
        redirect('/');
    }
}

export async function logout() {
    await deleteSession()
    redirect('/login')
}