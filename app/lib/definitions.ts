import { z } from 'zod'

// Zod form validation
export const UserFormSchema = z.object({
    id: z.string(),
    username: z
        .string()
        .min(2,{message : 'Username must be at least 2 characters'})
        .trim(),
    full_name: z
        .string()
        .min(2,{message: 'Name must be at least 2 characters'})
        .trim(),
    email: z
        .string()
        .email({message: 'Must be a valid email address'}),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    billing_address: z
        .string()
        .min(2, {message: 'Billing address must be at least 3 characters'})
        .trim(),
    delivery_address: z
        .string(),
});

export type LoginFormState =
    | {
    errors?: {
        username?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined

// User
export type User = {
    id: string,
    created_at: Date,
    username: string,
    full_name: string,
    email: string,
    password: string,
    phone: string,
    billing_address: string,
    delivery_address: string,
    is_admin: boolean,
    notes: string,
}

// User session payload
export type SessionPayload = {
    id: string,
    is_admin: boolean,
    expiresAt: Date,
}