import { z } from 'zod'
import validator from 'validator'

// Zod form validation
export const UserFormSchema = z.object({
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
    delivery_street: z
        .string()
        .min(2, {message: 'Street must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    delivery_apt_number: z
        .string()
        .trim()
        .optional()
        .or(z.literal('')),
    delivery_city: z
        .string()
        .min(2, {message: 'City must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    delivery_zip: z
        .string()
        .min(2, {message: 'Zip code must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    delivery_state: z
        .string()
        .min(2, {message: 'State must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    billing_street: z
        .string()
        .min(2, {message: 'Street must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    billing_apt_number: z
        .string()
        .trim()
        .optional()
        .or(z.literal('')),
    billing_city: z
        .string()
        .min(2, {message: 'City must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    billing_zip: z
        .string()
        .min(2, {message: 'Zip code must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    billing_state: z
        .string()
        .min(2, {message: 'State must be at least 2 characters'})
        .trim()
        .optional()
        .or(z.literal('')),
    phone: z
        .string()
        .refine(validator.isMobilePhone,{message: 'Must be a valid phone number'})
        .optional()
        .or(z.literal('')),
    birth_date: z
        .date()
        .optional()
        .or(z.literal('')),
});