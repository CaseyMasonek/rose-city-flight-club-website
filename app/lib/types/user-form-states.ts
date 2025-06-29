export type LoginFormState =
    | {
    errors?: {
        username?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined

export type SignupFormState =
    | {
    errors?: {
        username?: string[]
        password?: string[]
        first_name?: string[]
        last_name?: string[]
        confirm_password?: string[]
        email?: string[]
        phone?: string[]
        billing_address?: string[]
        delivery_address?: string[]
    }
    message?: string
}
    | undefined