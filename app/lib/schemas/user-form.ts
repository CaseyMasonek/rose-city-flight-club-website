import { z } from 'zod'
import validator from 'validator'

// Zod form validation
export const UserFormSchema = z.object({
    username: z
        .string()
        .min(2,{message : 'Username must be at least 2 characters'})
        .trim(),
    first_name: z
        .string()
        .min(2,{message: 'Name must be at least 2 characters'})
        .trim(),
    last_name: z
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
    confirm_password: z
        .string()
        .min(8, { message: 'Confirm your password'}),
    billing_address: z
        .string()
        .min(2, {message: 'Billing address must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    delivery_address: z
        .string()
        .min(2, {message: 'Billing address must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    phone: z
        .string()
        .refine(validator.isMobilePhone,{message: 'Must be a valid phone number'})
        .optional()
        .or(z.literal('')),
});