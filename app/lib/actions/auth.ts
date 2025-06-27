'use server'

import {LoginFormState, UserFormSchema} from "@/app/lib/definitions";

const AuthenticateUser = UserFormSchema.omit({ id: true, full_name: true, email: true, billing_address: true, delivery_address: true, });

/**
 * Authenticate user
 * @param formState
 * @param formData
 */
export async function login(formState: LoginFormState, formData: FormData) {
    // Validate form data
    const validatedFields = AuthenticateUser.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    console.log(formData.get('username'),formData.get('password'));
}