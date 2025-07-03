'use server'

import {LoginFormState, SignupFormState} from "@/app/lib/types/user-form-states";
import {UserFormSchema} from "@/app/lib/schemas/user-form";
import {sha256} from "js-sha256";
import {db} from '@/app/lib/db/client'
import {createSession, deleteSession} from "@/app/lib/auth/session";
import {redirect} from "next/navigation";
import {createUser, verifyUniqueness} from "@/app/lib/dal/users";

/**
 * Authenticate user
 * @param formState
 * @param formData
 */
export async function login(formState: LoginFormState, formData: FormData) {
    // Get form data
    const email = formData.get("email")!.toString().toLowerCase();
    const password = formData.get("password");

    // Encrypt password to check with the database
    const encryptedPassword = sha256(password!.toString());

    // Check is user exists in database
    const data = await db
        .selectFrom('users')
        .selectAll()
        .where('email','=',email)
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

/**
 * Log out user and send them to the log-out page
 */
export async function logout() {
    await deleteSession()
    redirect('/login')
}

export async function signup(formState: SignupFormState, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const password = data.password as string
    const confirmPassword = data.confirm_password as string

    const validatedFields = UserFormSchema.safeParse({
        password,
        confirm_password: confirmPassword,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        delivery_street: data.delivery_street,
        delivery_apt_number: data.delivery_apt_number,
        delivery_city: data.delivery_city,
        delivery_state: data.delivery_state,
        delivery_zip: data.delivery_zip,
        billing_street: data.billing_steet,
        billing_apt_number: data.billing_apt_number,
        billing_city: data.billing_city,
        billing_state: data.billing_state,
        billing_zip: data.billing_zip,
        billing_address: data.billing_address,
    })

    const deliveryAddress = {
        street: data.delivery_street,
        city: data.billing_city,
        state: data.delivery_state,
        zip: data.delivery_zip,
        apt_number: data.delivery_apt_number,
    }

    const billingAddress = data.billing_street ? {
        street: data.billing_street,
        city: data.billing_city,
        state: data.billing_state,
        zip: data.billing_zip,
        apt_number: data.billing_apt_number,
    } : deliveryAddress

    if (!(await verifyUniqueness('email',data.email as string))) {
        return {
            errors: {
                email:["User with this email already exists"],
            }
        }
    }

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

    const encryptedPassword = sha256(password)

    const userData = {
        password: encryptedPassword,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
        email: data.email as string,
        phone: data.phone as string,
        billing_address: billingAddress,
        delivery_address: deliveryAddress,
        notes: '',
        is_admin: false
    }

    const user = await createUser(userData)

    // Log user in
    await createSession(user)

    redirect('/')
}