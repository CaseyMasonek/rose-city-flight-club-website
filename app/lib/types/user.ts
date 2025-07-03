export type User = {
    id: string,
    created_at: Date,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string | null,
    billing_address: object | null,
    delivery_address: object | null,
    is_admin: boolean,
    notes: string | null,
}

export type NewUser = Omit<User, 'id' | 'created_at' | 'is_admin'>