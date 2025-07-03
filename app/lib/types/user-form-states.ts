export type LoginFormState =
    | {
    errors?: {
        password?: string[]
    }
    message?: string
}
    | undefined

export type SignupFormState =
    | {
    errors?: {
        first_name?: string[]
        last_name?: string[]
        password?: string[]
        confirm_password?: string[]
        email?: string[]
        phone?: string[]
        delivery_street?: string[]
        delivery_apt_number?: string[]
        delivery_city?: string[]
        delivery_zip?: string[]
        delivery_state?: string[]
        billing_street?: string[]
        billing_apt_number?: string[]
        billing_city?: string[]
        billing_zip?: string[]
        billing_state?: string[]
    }
    message?: string
}
    | undefined