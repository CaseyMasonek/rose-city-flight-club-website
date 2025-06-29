'use server'

import {LoginFormState, SignupFormState} from "@/app/lib/types/user-form-states";
import {UserFormSchema} from "@/app/lib/schemas/user-form";
import {sha256} from "js-sha256";
import {db} from '@/app/lib/db/client'
import {createSession, deleteSession} from "@/app/lib/auth/session";
import {redirect} from "next/navigation";
import {createUser, verifyUniqueness} from "@/app/lib/dal/users";

// Trim sign up form schema for login schema
const AuthenticateUser = UserFormSchema.omit({ first_name: true, last_name: true, email: true, billing_address: true, delivery_address: true, phone: true, confirm_password: true });

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
        console.log(validatedFields.error.formErrors);

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
                username:["Incorrect username or password"],
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

/**
 * Log out user and send them to the log-out page
 */
export async function logout() {
    await deleteSession()
    redirect('/login')
}

export async function signup(formState: SignupFormState, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const username = (data.username as string).toLowerCase()
    const password = data.password as string
    const confirmPassword = data.confirm_password as string

    const validatedFields = UserFormSchema.safeParse({
        username,
        password,
        confirm_password: confirmPassword,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        billing_address: data.billing_address,
        delivery_address: data.delivery_address,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    if (password !== confirmPassword) {
        return {
            errors: {
                confirm_password: ["Passwords do not match"],
            },
        }
    }

    if (!(await verifyUniqueness('username',username))) {
        return {
            errors: {
                username:["Username already taken"],
            }
        }
    }

    if (!(await verifyUniqueness('email',data.email as string))) {
        return {
            errors: {
                email:["User with this email already exists"],
            }
        }
    }

    const encryptedPassword = sha256(password)

    const userData = {
        username: username,
        password: encryptedPassword,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
        email: data.email as string,
        phone: data.phone as string,
        billing_address: data.billing_address as string,
        delivery_address: data.delivery_address as string,
        notes: '',
        is_admin: false
    }

    const user = await createUser(userData)

    // Log user in
    await createSession(user)

    redirect('/')
}